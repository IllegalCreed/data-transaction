import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
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
}
