// src/mailer/smtp.provider.ts

import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export const SMTP_TRANSPORTER_PROVIDER: Provider = {
  provide: 'MAIL_TRANSPORTER',
  useFactory: async (configService: ConfigService): Promise<Transporter> => {
    const host = configService.get<string>('SMTP_SERVER');
    const port = configService.get<number>('SMTP_PORT');
    const user = configService.get<string>('MAIL_USER');
    const pass = configService.get<string>('MAIL_PASS');

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 如果端口是465则使用SSL，否则使用STARTTLS
      auth: {
        user,
        pass,
      },
      // 如果是自签名证书，可以暂时这么配置：
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 验证连接配置
    transporter.verify((error) => {
      if (error) {
        console.error('SMTP 配置错误：', error);
      } else {
        console.log('SMTP 配置成功');
      }
    });

    return transporter;
  },
  inject: [ConfigService],
};
