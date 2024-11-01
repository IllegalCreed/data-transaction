import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ErrorCode } from 'src/common/constants/error-codes';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: Transporter,
    private readonly configService: ConfigService,
  ) {
    // 打印配置以确保正确加载
    console.log('SMTP_SERVER:', this.configService.get<string>('SMTP_SERVER'));
    console.log('SMTP_PORT:', this.configService.get<number>('SMTP_PORT'));
    console.log('MAIL_USER:', this.configService.get<string>('MAIL_USER'));
    console.log(
      'MAIL_PASS:',
      this.configService.get<string>('MAIL_PASS') ? '****' : 'undefined',
    );
  }

  // 私有的核心发送邮件方法
  private async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"北京市文旅数据专区平台" <${this.configService.get<string>('MAIL_USER')}>`,
      to: to,
      subject: subject,
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`发送邮件成功: ${to}`);
    } catch (error) {
      console.error('发送邮件失败：', error);
      throw new Error(ErrorCode.SEND_EMAIL_FAILED.toString());
    }
  }

  // 内部方法，供服务调用，抛出异常或返回 void
  async sendActivationEmailInternal(to: string, token: string): Promise<void> {
    const activationLink = `${this.configService.get<string>('FRONTEND_DOMAIN')}/register?token=${token}`;
    const html = `<p>您好，请点击链接激活您的账号: <a href="${activationLink}">${activationLink}</a></p>`;
    await this.sendMail(to, '激活账号', html);
  }

  // 外部方法，供 API 调用，返回统一的 ApiResponse<string>
  async sendActivationEmail(
    to: string,
    token: string,
  ): Promise<ApiResponse<string>> {
    try {
      await this.sendActivationEmailInternal(to, token);
      return createSuccessResponse('SEND_EMAIL_SUCCEED');
    } catch {
      return createErrorResponse(ErrorCode.SEND_EMAIL_FAILED);
    }
  }

  //   async sendPasswordResetEmail(to: string, token: string): Promise<void> {
  //   }
}
