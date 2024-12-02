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

    const email = await verifyToken<string>(
      token,
      this.configService.get<string>('JWT_SECRET'),
    );

    if (!email) {
      this.logger.error('重置密码失败：JWT验证失败');
      return createErrorResponse(ErrorCode.INVALID_VERIFICATION_TOKEN);
    }

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      this.logger.error('重置密码失败：用户不存在');
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    try {
      user.password = await hashPassword(newPassword);
      await this.userRepository.save(user);

      this.logger.log(`密码重置成功：${email}`);
      return createSuccessResponse(null, 'PASSWORD_RESET_SUCCEED');
    } catch (error) {
      this.logger.error('重置密码失败：', error);

      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      return createErrorResponse(ErrorCode.PASSWORD_RESET_FAILED);
    }
  }
}
