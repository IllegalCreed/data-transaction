// src/mailer/smtp.provider.ts

import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export const SMTP_TRANSPORTER_PROVIDER: Provider = {
  provide: 'MAIL_TRANSPORTER',
  useFactory: async (configService: ConfigService): Promise<Transporter> => {
    const transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_SERVER'),
      port: configService.get<number>('SMTP_PORT'),
      secure: configService.get<number>('SMTP_PORT') === 465, // true for 465, false for other ports
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    // 验证连接配置
    transporter.verify((error) => {
      if (error) {
        console.error('SMTP 配置错误：', error);
      } else {
        console.log('SMTP 配置成功，服务器已准备就绪');
      }
    });

    return transporter;
  },
  inject: [ConfigService],
};
