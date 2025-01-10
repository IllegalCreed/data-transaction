import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Request,
  BadRequestException,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendVerificationCodeDto } from './dto/send-verification-code.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SendActivationEmailDto } from './dto/send-activation-email.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SendVerificationCodeAuthDto } from './dto/send-verification-code-auth.dto';
import { VerifyCodeAuthDto } from './dto/verify-code-auth.dto';
import { ExpectedError } from 'src/types/error';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';

@Controller('mailer')
export class MailerController {
  private readonly logger = new Logger(MailerController.name);
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-activation')
  @HttpCode(HttpStatus.OK)
  async sendActivationEmail(
    @Body() sendActivationEmailDto: SendActivationEmailDto,
  ) {
    return this.mailerService.sendActivationEmail(sendActivationEmailDto);
  }

  @Post('send-verification-code')
  async sendVerificationCode(
    @Body() sendVerificationCodeDto: SendVerificationCodeDto,
  ): Promise<ApiResponse<string>> {
    const { email, type } = sendVerificationCodeDto;

    try {
      await this.mailerService.sendVerificationCode(email, type);
      return createSuccessResponse(null, 'SEND_VERIFICATION_CODE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('验证码核销失败：', error);
      return createErrorResponse(ErrorCode.VERIFY_CODE_FAILED);
    }
  }

  @Post('verify-code')
  async verifyCode(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<ApiResponse<string>> {
    const { email, code, type } = verifyCodeDto;
    try {
      const token = await this.mailerService.verifyCode(email, code, type);
      return createSuccessResponse(token, 'VERIFY_CODE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('验证码核销失败：', error);
      return createErrorResponse(ErrorCode.VERIFY_CODE_FAILED);
    }
  }

  @UseGuards(AuthGuard)
  @Post('send-verification-code/auth')
  async sendVerificationCodeAuth(
    @Request() req,
    @Body() sendVerificationCodeAuthDto: SendVerificationCodeAuthDto,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      this.logger.error('发送验证码失败：token解析错误');
      throw new BadRequestException('No email found in token.');
    }
    const { type } = sendVerificationCodeAuthDto;
    try {
      await this.mailerService.sendVerificationCode(email, type);
      return createSuccessResponse(null, 'SEND_VERIFICATION_CODE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('验证码核销失败：', error);
      return createErrorResponse(ErrorCode.VERIFY_CODE_FAILED);
    }
  }

  @UseGuards(AuthGuard)
  @Post('verify-code/auth')
  async verifyCodeAuth(
    @Request() req,
    @Body() verifyCodeAuthDto: VerifyCodeAuthDto,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      this.logger.error('验证码核销失败：token解析错误');
      throw new BadRequestException('No email found in token.');
    }
    const { code, type } = verifyCodeAuthDto;
    try {
      const token = await this.mailerService.verifyCode(email, code, type);
      return createSuccessResponse(token, 'VERIFY_CODE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('验证码核销失败：', error);
      return createErrorResponse(ErrorCode.VERIFY_CODE_FAILED);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async removeExpiredVerificationCodes() {
    this.mailerService.removeExpiredVerificationCode();
  }

  @Get('test/get-code')
  async getVerificationCodeForTesting(
    @Query('email') email: string,
    @Query('type') type: number,
  ): Promise<ApiResponse<string>> {
    // 在非生产环境中，禁止使用此端点
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv !== 'development') {
      throw new BadRequestException(
        'This endpoint is only available in testing environments.',
      );
    }
    if (!email) {
      throw new BadRequestException('Email is required.');
    }
    if (!type) {
      throw new BadRequestException('Type is required.');
    }

    return this.mailerService.getVerificationCodeForTesting(email, type);
  }
}
