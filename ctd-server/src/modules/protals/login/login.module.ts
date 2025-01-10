import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from 'src/entities/user.entity';
import { LoginLog } from 'src/entities/login-log.entity';
import { CaptchaModule } from 'src/modules/common/captcha/captcha.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginLog]),
    CaptchaModule,
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
