import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import {
  generateToken,
  hashPassword,
  verifyPassword,
  verifyToken,
} from 'src/common/utils/security';
import { VerificationCodes } from 'src/enums/verification-codes.enum';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ExpectedError } from 'src/types/error';

@Injectable()
export class ChangePasswordService {
  private readonly logger = new Logger(ChangePasswordService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 验证用户提供的当前密码是否正确
   * @param userId 当前用户的ID
   * @param verifyDto 验证当前密码的DTO
   * @returns ApiResponse<string>
   */
  async verifyPassword(
    userId: number,
    verifyDto: VerifyPasswordDto,
  ): Promise<ApiResponse<string>> {
    const { currentPassword, token } = verifyDto;

    // 从数据库中获取用户信息
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      this.logger.warn(`验证密码失败，用户不存在`);
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    // 验证token
    const { email, type } = await verifyToken<{
      email: string;
      type: VerificationCodes;
    }>(token, this.configService.get<string>('JWT_SECRET'));

    if (email !== user.email || type !== VerificationCodes.ChangePWD) {
      this.logger.warn('验证密码失败：JWT验证失败');
      return createErrorResponse(ErrorCode.INVALID_VERIFICATION_TOKEN);
    }

    // 比较密码
    const isPasswordValid = await verifyPassword(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      this.logger.warn(`验证密码失败，密码错误：邮箱 ${email}`);
      return createErrorResponse(ErrorCode.VERIFY_PASSWORD_FAILED);
    }

    // 生成新凭据
    const newToken = await generateToken<{
      email: string;
      type: VerificationCodes;
    }>(
      { email, type: VerificationCodes.verifyPWD },
      this.configService.get<string>('JWT_SECRET'),
      '10m',
    );

    this.logger.log(`验证密码成功：${user.email}`);
    return createSuccessResponse(newToken, 'VERIFY_PASSWORD_SUCCEED');
  }

  /**
   * 修改用户密码
   * @param changePasswordDto 修改密码的DTO
   * @returns ApiResponse<string>
   */
  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<ApiResponse<string>> {
    const { token, newPassword } = changePasswordDto;

    // 从数据库中获取用户信息
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      this.logger.warn(`修改密码失败，用户不存在`);
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    // 验证token
    const { email, type } = await verifyToken<{
      email: string;
      type: VerificationCodes;
    }>(token, this.configService.get<string>('JWT_SECRET'));

    if (email !== user.email || type !== VerificationCodes.verifyPWD) {
      this.logger.warn('修改密码失败：JWT验证失败');
      return createErrorResponse(ErrorCode.INVALID_VERIFICATION_TOKEN);
    }

    // 更新密码
    try {
      user.password = await hashPassword(newPassword);
      await this.userRepository.save(user);

      this.logger.log(`修改密码成功：${user.email}`);
      return createSuccessResponse(null, 'CHANGE_PASSWORD_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('修改密码失败：', error);
      return createErrorResponse(ErrorCode.CHANGE_PASSWORD_FAILED);
    }
  }
}
