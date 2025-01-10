import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Request,
  BadRequestException,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ExpectedError } from 'src/types/error';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import { SendToNewEmailDto } from './dto/send-to-new-email.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { GetRecoveryCodeForTestDto } from './dto/get-recovery-code-for-test.dto';

@Controller('change-email')
export class ChangeEmailController {
  private readonly logger = new Logger(ChangeEmailController.name);
  constructor(private readonly changeEmailService: ChangeEmailService) {}

  /**
   * 测试方法：获取一个可用的救援代码
   * 用于前端 E2E 测试
   */
  @Get('test/get-recovery-code')
  @HttpCode(HttpStatus.OK)
  async getRecoveryCodeForTest(
    @Body() getRecoveryCodeForTestDto: GetRecoveryCodeForTestDto,
  ): Promise<ApiResponse<string>> {
    const { email } = getRecoveryCodeForTestDto;

    try {
      const code = await this.changeEmailService.getRecoveryCodeForTest(email);
      this.logger.log(`获取救援代码成功：email=${email}, code=${code}`);
      return createSuccessResponse(code, 'GET_RECOVERY_CODE_SUCCEED');
    } catch (error) {
      this.logger.error(`测试方法：获取可用恢复码失败 email=${email}`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('获取救援代码失败：', error);
      return createErrorResponse(ErrorCode.GET_RECOVERY_CODE_FAILED);
    }
  }

  /**
   * 验证当前密码和救援码
   * POST /change-email/verify-password
   * @param verifyDto 包含 currentPassword, recoveryCode
   * @returns ApiResponse<string> 成功时返回新的 JWT 令牌
   */
  @UseGuards(AuthGuard)
  @Post('verify-password')
  @HttpCode(HttpStatus.OK)
  async verifyPassword(
    @Body() verifyDto: VerifyPasswordDto,
    @Request() req,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('No email found in token.');
    }

    const { currentPassword, recoveryCode } = verifyDto;

    try {
      const token = await this.changeEmailService.verifyPassword(
        email,
        currentPassword,
        recoveryCode,
      );
      this.logger.log(`身份验证成功：email=${email}`);
      return createSuccessResponse(token, 'VERIFY_PASSWORD_SUCCEED');
    } catch (error) {
      this.logger.error(`身份验证失败：email=${email}`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('身份验证失败：', error);
      return createErrorResponse(ErrorCode.VERIFY_PASSWORD_FAILED);
    }
  }

  /**
   * 发送验证码到新邮箱
   * POST /change-email/send-to-new-email
   * @param dto 包含 newEmail, token
   * @returns ApiResponse<string> 成功时仅返回成功消息
   */
  @UseGuards(AuthGuard)
  @Post('send-to-new-email')
  @HttpCode(HttpStatus.OK)
  async sendToNewEmail(
    @Body() dto: SendToNewEmailDto,
    @Request() req,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('No email found in token.');
    }

    const { token, newEmail } = dto;

    try {
      await this.changeEmailService.sendToNewEmail(email, token, newEmail);
      this.logger.log(
        `发送验证码到新邮箱成功: email=${email}, newEmail=${newEmail}`,
      );
      return createSuccessResponse(null, 'SEND_CODE_TO_NEW_EMAIL_SUCCEED');
    } catch (error) {
      this.logger.error(`发送验证码到新邮箱失败: email=${email}`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      return createErrorResponse(ErrorCode.SEND_EMAIL_FAILED);
    }
  }

  /**
   * 修改邮箱
   * POST /change-email
   * @param changeEmailDto { newEmail, code }
   * @returns ApiResponse<string> 成功时返回成功消息
   */
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async changeEmail(
    @Body() changeEmailDto: ChangeEmailDto,
    @Request() req,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('No email found in token.');
    }

    const { newEmail, code } = changeEmailDto;

    try {
      await this.changeEmailService.changeEmail(email, newEmail, code);
      this.logger.log(`邮箱修改成功: email=${email}, newEmail=${newEmail}`);
      return createSuccessResponse(null, 'CHANGE_EMAIL_SUCCEED');
    } catch (error) {
      this.logger.error(`邮箱修改失败: email=${email}`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      return createErrorResponse(ErrorCode.CHANGE_EMAIL_FAILED);
    }
  }
}
