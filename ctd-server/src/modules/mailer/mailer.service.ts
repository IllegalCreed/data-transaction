import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { mailerConfig } from './mailer.config';
import { createSuccessResponse } from 'src/common/utils/response';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig);
  }

  async sendActivationEmail(
    to: string,
    token: string,
  ): Promise<ApiResponse<string>> {
    // 发送激活邮件的实现
    const activationLink = `${process.env.FRONTEND_DOMAIN}/activate?token=${token}`;
    const mailOptions = {
      from: `"Low Code Platform" <${process.env.MAIL_USER}>`, // 发件人地址
      to: to, // 收件人列表
      subject: 'Activate Your Account', // 邮件标题
      text: `Hi, please use the following link to activate your account: ${activationLink}`, // 纯文本内容
      html: `<p>Hi, please use the following link to activate your account: <a href="${activationLink}">${activationLink}</a></p>`, // HTML内容
    };

    // 发送邮件
    const info = await this.transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return createSuccessResponse('SEND_EMAIL_SUCCEED');
  }

  //   async sendPasswordResetEmail(to: string, token: string): Promise<void> {
  //   }
}
