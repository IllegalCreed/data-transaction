import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { SMTP_TRANSPORTER_PROVIDER } from './smtp.provider';

@Module({
  controllers: [MailerController],
  providers: [MailerService, SMTP_TRANSPORTER_PROVIDER],
  exports: [MailerService], // 导出 MailerService 使其可以在其他模块中注入
})
export class MailerModule {}
