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
    @Inject('MAIL_TRANSPORTER') private readonly transporter: Transporter,
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

  async sendActivationEmail(
    to: string,
    token: string,
  ): Promise<ApiResponse<string>> {
    const activationLink = `${process.env.FRONTEND_DOMAIN}/register?token=${token}`;
    const mailOptions = {
      from: `"北京市文旅数据专区平台" <${process.env.MAIL_USER}>`, // 发件人地址
      to: to, // 收件人列表
      subject: '激活账号', // 邮件标题
      text: `您好，请点击链接激活您的账号: ${activationLink}`, // 纯文本内容
      html: `<p>您好，请点击链接激活您的账号: <a href="${activationLink}">${activationLink}</a></p>`, // HTML内容
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('发送邮件: %s', info.messageId);
      return createSuccessResponse('SEND_EMAIL_SUCCEED');
    } catch (error) {
      console.error('发送激活邮件失败：', error);
      return createErrorResponse(ErrorCode.SEND_EMAIL_FAILED);
    }
  }

  //   async sendPasswordResetEmail(to: string, token: string): Promise<void> {
  //   }
}
