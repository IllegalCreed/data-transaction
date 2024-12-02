import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity'; // 假设您有 User 实体
import { LoginLog } from '../../entities/login-log.entity'; // 登录日志实体
import { CaptchaModule } from '../captcha/captcha.module'; // 验证码模块
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginLog]),
    CaptchaModule, // 如果需要使用验证码服务
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
