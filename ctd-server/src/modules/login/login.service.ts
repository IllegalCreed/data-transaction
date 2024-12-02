import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { GetLoginLogsDto } from './dto/get-login-logs.dto';
import { LoginLogDto } from './dto/login-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { LoginLog } from '../../entities/login-log.entity';
import { CaptchaService } from '../captcha/captcha.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LoginLog)
    private readonly loginLogRepository: Repository<LoginLog>,
    private readonly captchaService: CaptchaService, // 验证码服务
  ) {}

  // 检查是否需要验证码
  async checkCaptcha(email: string): Promise<boolean> {
    // 方法实现稍后补充
    console.log(email);
    return false;
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
