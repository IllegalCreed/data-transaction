// src/captcha/captcha.module.ts

import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Captcha } from './captcha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Captcha])],
  providers: [CaptchaService],
  controllers: [CaptchaController],
  exports: [CaptchaService],
})
export class CaptchaModule {}
