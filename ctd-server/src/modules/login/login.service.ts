import { Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { GetLoginLogsDto } from './dto/get-login-logs.dto';
import { LoginLogDto } from './dto/login-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { LoginLog } from '../../entities/login-log.entity';
import { CaptchaService } from '../captcha/captcha.service';
import { CheckCaptchaDto } from './dto/check-captcha.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ConfigService } from '@nestjs/config';
import { ErrorCode } from 'src/common/constants/error-codes';
import { UserStatus } from 'src/enums/user-status.enum';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LoginLog)
    private readonly loginLogRepository: Repository<LoginLog>,
    private readonly captchaService: CaptchaService,

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

  async checkCaptcha(
    checkCaptchaDto: CheckCaptchaDto,
  ): Promise<ApiResponse<boolean>> {
    const CAPTCHA_THRESHOLD = this.configService.get<number>(
      'CAPTCHA_THRESHOLD',
      3,
    );

    const { email } = checkCaptchaDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.status !== UserStatus.ACTIVE) {
      this.logger.warn(`用户不存在或状态异常：${email}`);
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
    }

    const failedAttempts = user.failedAttempts || 0;

    if (failedAttempts >= CAPTCHA_THRESHOLD) {
      this.logger.log(`用户登录失败次数超过验证码阈值，需要验证码：${email}`);
      return createSuccessResponse(true, 'NEED_CAPTCHA');
    }

    this.logger.log(`用户不需要验证码：${email}`);
    return createSuccessResponse(false, 'NO_NEED_CAPTCHA');
  }

  // 登录
  async login(
    loginDto: LoginDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<{
    token?: string;
    requiresCaptcha?: boolean;
  }> {
    // 方法实现稍后补充
    console.log(loginDto);
    console.log(ipAddress);
    console.log(userAgent);
    return { token: 'dummy_token' };
  }

  // 获取登录日志
  async getLoginLogs(
    userId: string,
    getLoginLogsDto: GetLoginLogsDto,
  ): Promise<{ data: LoginLogDto[]; total: number }> {
    const {
      pageNum = 1,
      pageSize = 10,
      startDate,
      endDate,
      type,
    } = getLoginLogsDto;

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
      userId: log.userId,
      email: log.email,
      loginTime: log.loginTime,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      success: log.success,
      failureReason: log.failureReason,
    }));

    return { data, total };
  }

  async getLastLoginLog(userId: string): Promise<LoginLogDto> {
    const lastLog = await this.loginLogRepository.findOne({
      where: { userId },
      order: { loginTime: 'DESC' },
    });

    if (!lastLog) {
      // 如果没有找到日志，可以返回 null 或抛出异常
      return null;
    }

    // 将实体转换为 DTO
    return {
      id: lastLog.id,
      userId: lastLog.userId,
      email: lastLog.email,
      loginTime: lastLog.loginTime,
      ipAddress: lastLog.ipAddress,
      userAgent: lastLog.userAgent,
      success: lastLog.success,
      failureReason: lastLog.failureReason,
    };
  }
}
