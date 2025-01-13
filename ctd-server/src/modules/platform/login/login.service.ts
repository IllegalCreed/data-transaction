import { Injectable, Logger } from '@nestjs/common';
import { CaptchaService } from 'src/modules/common/captcha/captcha.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import { hashPassword, verifyPassword } from 'src/common/utils/security';
import { JwtService } from '@nestjs/jwt';
import { ExpectedError } from 'src/types/error';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    private readonly captchaService: CaptchaService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ApiResponse<{ token?: string }>> {
    const { username, password, captchaId, captchaCode } = loginDto;
    try {
      await this.captchaService.validateCaptchaInternally(
        captchaId,
        captchaCode,
      );

      const admin = await this.adminRepository.findOne({ where: { username } });
      if (!admin) {
        this.logger.warn(`平台用户登录失败：用户不存在：${username}`);
        return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
      }

      // 验证密码
      const isPasswordValid = await verifyPassword(password, admin.password);
      if (!isPasswordValid) {
        this.logger.warn(`平台用户登录失败：密码错误：${username}`);
        return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
      }

      // 生成JWT
      const payload = {
        sub: admin.id,
        username: admin.username,
        role: UserRole.Admin,
      };
      const token = this.jwtService.sign(payload);

      this.logger.log(`平台用户登录成功：${username}`);
      return createSuccessResponse({ token }, 'PLATFORM_LOGIN_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('平台用户登录失败', error);
      return createErrorResponse(ErrorCode.LOGIN_FAILED);
    }
  }

  async createAdminForTesting(
    createDto: CreateAdminDto,
  ): Promise<ApiResponse<string>> {
    try {
      const { username, fullName, password } = createDto;

      // 检查用户名是否已存在
      const exist = await this.adminRepository.findOne({ where: { username } });
      if (exist) {
        this.logger.warn(`创建管理员失败：用户名已存在：${username}`);
        return createErrorResponse(ErrorCode.ADMIN_ALREADY_EXISTS);
      }

      const hashedPassword = await hashPassword(password);
      const admin = this.adminRepository.create({
        username,
        fullName,
        password: hashedPassword,
      });

      await this.adminRepository.save(admin);
      this.logger.log(`管理员创建成功：${username}`);
      return createSuccessResponse(null, 'ADMIN_CREATED_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('创建管理员失败', error);
      return createErrorResponse(ErrorCode.CREATE_ADMIN_FAILED);
    }
  }
}
