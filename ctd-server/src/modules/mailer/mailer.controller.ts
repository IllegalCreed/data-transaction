import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/send-activation')
  @HttpCode(HttpStatus.OK)
  async sendActivationEmail(@Body() body: { to: string; token: string }) {
    return this.mailerService.sendActivationEmail(body.to, body.token);
  }

  // @Post('/send-password-reset')
  // @HttpCode(HttpStatus.OK)
  // async sendPasswordResetEmail(@Body() body: { to: string; token: string }) {
  //   await this.mailerService.sendPasswordResetEmail(body.to, body.token);
  //   return { message: 'Password reset email sent successfully' };
  // }
}
