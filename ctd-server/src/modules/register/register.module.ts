import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { User } from 'src/entities/user.entity';
import { UserActivation } from 'src/entities/user-activation.entity';
import { MailerModule } from 'src/modules/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserActivation]), MailerModule],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService], // 如果其他模块需要使用RegisterService，则需要导出
})
export class RegisterModule {}
