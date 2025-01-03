import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { CaptchaModule } from 'src/modules/common/captcha/captcha.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CaptchaModule, TypeOrmModule.forFeature([Admin]), AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class PlatformLoginModule {}
