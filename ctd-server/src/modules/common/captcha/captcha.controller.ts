import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { VerifyCaptchaDto } from './dto/verify-captcha.dto';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  async getCaptcha(): Promise<ApiResponse<{ id: string; data: string }>> {
    return this.captchaService.getCaptcha();
  }

  @Post('verify')
  async verifyCaptcha(
    @Body() verifyCaptchaDto: VerifyCaptchaDto,
  ): Promise<ApiResponse<string>> {
    return this.captchaService.verifyCaptcha(verifyCaptchaDto);
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async removeExpiredCaptchas() {
    this.captchaService.removeExpiredCaptcha();
  }

  @Get('test/get-code')
  async getCodeForTesting(
    @Query('captchaId') captchaId: string,
  ): Promise<ApiResponse<string>> {
    // 在非生产环境中，禁止使用此端点
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv !== 'development') {
      throw new BadRequestException(
        'This endpoint is only available in testing environments.',
      );
    }

    // 测试接口，不使用DTO，简化处理
    if (!captchaId) {
      throw new BadRequestException('CaptchaId is required.');
    }

    return this.captchaService.getCodeForTesting(captchaId);
  }
}
