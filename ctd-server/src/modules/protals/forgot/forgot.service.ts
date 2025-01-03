import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { verifyToken, hashPassword } from 'src/common/utils/security';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ConfigService } from '@nestjs/config';
import { ExpectedError } from 'src/types/error';
import { UserStatus } from 'src/enums/user-status.enum';
import { VerificationCodes } from 'src/enums/verification-codes.enum';

@Injectable()
export class ForgotService {
  private readonly logger = new Logger(ForgotService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ApiResponse<string>> {
    const { token, newPassword } = resetPasswordDto;

    const { email, type } = await verifyToken<{
      email: string;
      type: VerificationCodes;
    }>(token, this.configService.get<string>('JWT_SECRET'));

    if (!email || type !== VerificationCodes.ForgotPWD) {
      this.logger.warn('重置密码失败：JWT验证失败');
      return createErrorResponse(ErrorCode.INVALID_VERIFICATION_TOKEN);
    }

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.status !== UserStatus.ACTIVE) {
      // 理论上到这一步的用户已经经过了前序接口的验证，如果这里依然出现问题，说明程序逻辑有误
      this.logger.error('重置密码失败：用户不存在或状态异常');
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
    }

    try {
      user.password = await hashPassword(newPassword);
      await this.userRepository.save(user);

      this.logger.log(`密码重置成功：${email}`);
      return createSuccessResponse(null, 'PASSWORD_RESET_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('重置密码失败：', error);
      return createErrorResponse(ErrorCode.PASSWORD_RESET_FAILED);
    }
  }
}
