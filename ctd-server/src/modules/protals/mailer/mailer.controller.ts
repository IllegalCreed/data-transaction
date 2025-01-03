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
    const { email, type } = sendVerificationCodeDto;
    return this.mailerService.sendVerificationCode(email, type);
  }

  @Post('verify-code')
  async verifyCode(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<ApiResponse<string>> {
    const { email, code, type } = verifyCodeDto;
    return this.mailerService.verifyCode(email, code, type);
  }

  @UseGuards(AuthGuard)
  @Post('send-verification-code/auth')
  async sendVerificationCodeAuth(
    @Request() req,
    @Body() sendVerificationCodeAuthDto: SendVerificationCodeAuthDto,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('No email found in token.');
    }
    const { type } = sendVerificationCodeAuthDto;
    return this.mailerService.sendVerificationCode(email, type);
  }

  @UseGuards(AuthGuard)
  @Post('verify-code/auth')
  async verifyCodeAuth(
    @Request() req,
    @Body() verifyCodeAuthDto: VerifyCodeAuthDto,
  ): Promise<ApiResponse<string>> {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('No email found in token.');
    }
    const { code, type } = verifyCodeAuthDto;
    return this.mailerService.verifyCode(email, code, type);
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
