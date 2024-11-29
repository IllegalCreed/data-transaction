import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendVerificationCodeDto } from './dto/send-verification-code.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SendActivationEmailDto } from './dto/send-activation-email.dto';

@Controller('mailer')
export class MailerController {
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
    return this.mailerService.sendVerificationCode(sendVerificationCodeDto);
  }

  @Post('verify-code')
  async verifyCode(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<ApiResponse<string>> {
    return this.mailerService.verifyCode(verifyCodeDto);
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
