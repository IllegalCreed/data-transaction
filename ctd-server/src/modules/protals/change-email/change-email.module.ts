import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailController } from './change-email.controller';
import { User } from 'src/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, MailerModule],
  controllers: [ChangeEmailController],
  providers: [ChangeEmailService],
})
export class ChangePasswordModule {}
