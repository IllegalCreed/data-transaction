import { Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { GetLoginLogsDto } from './dto/get-login-logs.dto';
import { LoginLogDto } from './dto/login-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { LoginLog } from '../../entities/login-log.entity';
import { CaptchaService } from '../captcha/captcha.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ConfigService } from '@nestjs/config';
import { ErrorCode } from 'src/common/constants/error-codes';
import { UserStatus } from 'src/enums/user-status.enum';
import { ExpectedError } from 'src/types/error';
import { verifyPassword } from 'src/common/utils/security';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LoginLog)
    private readonly loginLogRepository: Repository<LoginLog>,
    private readonly captchaService: CaptchaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('--------------LOGIN CONFIG----------------');
      console.log(
        'CAPTCHA_THRESHOLD:',
        this.configService.get<number>('CAPTCHA_THRESHOLD'),
      );
      console.log(
        'FREEZE_THRESHOLD:',
        this.configService.get<number>('FREEZE_THRESHOLD'),
      );
    }
  }

  async checkCaptcha(email: string): Promise<ApiResponse<boolean>> {
    if (!email || !isEmail(email)) {
      this.logger.warn(`是否需要验证码：参数不合法`);
      return createSuccessResponse(false, 'NO_NEED_CAPTCHA');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.status !== UserStatus.ACTIVE) {
      this.logger.warn(`是否需要验证码：用户不存在或状态异常：${email}`);
      return createSuccessResponse(false, 'NO_NEED_CAPTCHA');
    }

    const CAPTCHA_THRESHOLD = this.configService.get<number>(
      'CAPTCHA_THRESHOLD',
      3,
    );
    const failedAttempts = user.failedAttempts || 0;

    if (failedAttempts >= CAPTCHA_THRESHOLD) {
      this.logger.log(`用户登录失败次数超过验证码阈值，需要验证码：${email}`);
      return createSuccessResponse(true, 'NEED_CAPTCHA');
    }

    this.logger.log(`用户不需要验证码：${email}`);
    return createSuccessResponse(false, 'NO_NEED_CAPTCHA');
  }

  async login(
    loginDto: LoginDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<ApiResponse<{ token?: string; requiresCaptcha?: boolean }>> {
    const { email, password, captchaId, captchaCode } = loginDto;

    // 验证用户是否存在和状态
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`登录失败：用户不存在：${email}`);
      // 为了安全性，返回通用错误信息
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS, {
        requiresCaptcha: false,
      });
    }
    if (user.status !== UserStatus.ACTIVE) {
      try {
        await this.recordLoginLog(
          user,
          email,
          ipAddress,
          userAgent,
          false,
          '用户状态不允许',
        );
        this.logger.warn(`登录失败：用户状态不允许：${email}`);
        return createErrorResponse(ErrorCode.INVALID_CREDENTIALS, {
          requiresCaptcha: false,
        });
      } catch (error) {
        if (error instanceof ExpectedError) {
          return createErrorResponse(error.errorCode);
        }
        this.logger.error('登录失败', error);
        return createErrorResponse(ErrorCode.LOGIN_FAILED);
      }
    }

    // 验证图片验证码 (如果需要)
    const CAPTCHA_THRESHOLD = this.configService.get<number>(
      'CAPTCHA_THRESHOLD',
      3,
    );
    if (user.failedAttempts >= CAPTCHA_THRESHOLD) {
      if (!captchaId || !captchaCode) {
        // 如果超过次数前端应该带验证码请求，如果没有代表有逻辑错误
        this.logger.error('登录失败：未提供验证码');
        return createErrorResponse(ErrorCode.CAPTCHA_REQUIRED, {
          requiresCaptcha: true,
        });
      }
      try {
        await this.captchaService.validateCaptchaInternally(
          captchaId,
          captchaCode,
        );
      } catch (error) {
        await this.recordLoginLog(
          user,
          email,
          ipAddress,
          userAgent,
          false,
          '验证码验证失败',
        );
        if (error instanceof ExpectedError) {
          return createErrorResponse(error.errorCode, {
            requiresCaptcha: true,
          });
        }
        this.logger.error('登录失败', error);
        return createErrorResponse(ErrorCode.LOGIN_FAILED, {
          requiresCaptcha: true,
        });
      }
    }

    // 验证密码
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      try {
        await this.recordLoginLog(
          user,
          email,
          ipAddress,
          userAgent,
          false,
          '密码错误',
        );
        await this.incrementFailedAttempts(user);

        this.logger.warn(`登录失败：密码验证失败：${email}`);

        // 冻结用户
        const FREEZE_THRESHOLD = this.configService.get<number>(
          'FREEZE_THRESHOLD',
          5,
        );
        if (user.failedAttempts >= FREEZE_THRESHOLD) {
          this.logger.warn(`冻结用户账户：${email}`);
          user.status = UserStatus.SUSPENDED;
          await this.userRepository.save(user);
          return createErrorResponse(ErrorCode.ACCOUNT_SUSPENDED, {
            requiresCaptcha: false,
          });
        }

        // 下次登录需要验证码
        if (user.failedAttempts >= CAPTCHA_THRESHOLD) {
          return createErrorResponse(ErrorCode.INVALID_CREDENTIALS, {
            requiresCaptcha: true,
          });
        }

        return createErrorResponse(ErrorCode.INVALID_CREDENTIALS, {
          requiresCaptcha: false,
        });
      } catch (error) {
        if (error instanceof ExpectedError) {
          return createErrorResponse(error.errorCode);
        }
        this.logger.error('登录失败', error);
        return createErrorResponse(ErrorCode.LOGIN_FAILED);
      }
    }

    try {
      // 密码验证成功，重置失败次数
      if (user.failedAttempts !== 0) {
        this.clearFailedAttempts(user);
      }

      // 生成 JWT 令牌并返回
      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);
      await this.recordLoginLog(user, email, ipAddress, userAgent, true, null);
      this.logger.log(`用户登录成功：${email}`);
      return createSuccessResponse({ token }, 'LOGIN_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('登录失败', error);
      return createErrorResponse(ErrorCode.LOGIN_FAILED);
    }
  }

  async getLoginLogs(
    userId: string,
    getLoginLogsDto: GetLoginLogsDto,
  ): Promise<ApiResponse<{ data: LoginLogDto[]; total: number }>> {
    const {
      pageNum = 1,
      pageSize = 10,
      startDate,
      endDate,
      type,
    } = getLoginLogsDto;

    try {
      const query = this.loginLogRepository
        .createQueryBuilder('log')
        .where('log.userId = :userId', { userId });

      if (startDate) {
        query.andWhere('log.loginTime >= :startDate', { startDate });
      }

      if (endDate) {
        query.andWhere('log.loginTime <= :endDate', { endDate });
      }

      if (type) {
        if (type === 'success') {
          query.andWhere('log.success = :success', { success: true });
        } else if (type === 'failure') {
          query.andWhere('log.success = :success', { success: false });
        }
      }

      const [logs, total] = await query
        .orderBy('log.loginTime', 'DESC')
        .skip((pageNum - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      const data = logs.map((log) => ({
        id: log.id,
        email: log.email,
        loginTime: log.loginTime,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        success: log.success,
        failureReason: log.failureReason,
      }));

      this.logger.log(`获取登录日志成功：${userId}`);
      return createSuccessResponse(
        {
          data,
          total,
        },
        'GET_LOGIN_LOG_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('获取登录日志失败', error);
      return createErrorResponse(ErrorCode.GET_LOGIN_LOG_FAILED);
    }
  }

  async getLastLoginLog(userId: number): Promise<ApiResponse<LoginLogDto>> {
    const lastLog = await this.loginLogRepository.findOne({
      where: { user: { id: userId } },
      order: { loginTime: 'DESC' },
    });

    if (!lastLog) {
      return createErrorResponse(ErrorCode.LOGIN_LOG_NOT_FOUND);
    }

    this.logger.log(`获取最后一条登录日志成功：${userId}`);
    return createSuccessResponse(
      {
        id: lastLog.id,
        email: lastLog.email,
        loginTime: lastLog.loginTime,
        ipAddress: lastLog.ipAddress,
        userAgent: lastLog.userAgent,
        success: lastLog.success,
        failureReason: lastLog.failureReason,
      },
      'GET_LAST_LOGIN_LOG_SUCCEED',
    );
  }

  private async recordLoginLog(
    user: User,
    email: string,
    ipAddress: string,
    userAgent: string,
    success: boolean,
    failureReason?: string,
  ): Promise<void> {
    try {
      const log = this.loginLogRepository.create({
        user,
        email,
        ipAddress,
        userAgent,
        success,
        failureReason,
      });
      await this.loginLogRepository.save(log);
    } catch (error) {
      this.logger.error('登录失败：记录登录日志失败', error);
      throw new ExpectedError(ErrorCode.CREATE_LOGIN_LOG_FAILED);
    }
  }

  private async incrementFailedAttempts(user: User): Promise<void> {
    user.failedAttempts += 1;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('登录失败：增加失败次数失败', error);
      throw new ExpectedError(ErrorCode.LOGIN_FAILED);
    }
  }

  private async clearFailedAttempts(user: User): Promise<void> {
    user.failedAttempts = 0;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('登录失败：重置失败次数失败', error);
      throw new ExpectedError(ErrorCode.LOGIN_FAILED);
    }
  }

  async unfreezeUserForTesting(email: string): Promise<ApiResponse<string>> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`解冻用户失败：用户不存在：${email}`);
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
    }

    if (user.status === UserStatus.SUSPENDED || user.failedAttempts !== 0) {
      user.status = UserStatus.ACTIVE;
      user.failedAttempts = 0; // 重置失败次数，以便下次登录无需验证码
      try {
        await this.userRepository.save(user);
        this.logger.log(`解冻用户成功：用户已解冻：${email}`);
        return createSuccessResponse('USER_UNFROZENED');
      } catch (error) {
        this.logger.error('解冻用户失败', error);
        throw new ExpectedError(ErrorCode.UNFREEZE_USER_FAILED);
      }
    }

    this.logger.log(`解冻用户成功：用户未被冻结：${email}`);
    // 如果用户本身未冻结，则返回无操作状态
    return createSuccessResponse('USER_NOT_SUSPENDED');
  }
}
