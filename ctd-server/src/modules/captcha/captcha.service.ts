import * as svgCaptcha from 'svg-captcha';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Captcha } from '../../entities/captcha.entity';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { VerifyCaptchaDto } from './dto/verify-captcha.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CaptchaService {
  private readonly logger = new Logger(CaptchaService.name);
  constructor(
    @InjectRepository(Captcha)
    private readonly captchaRepository: Repository<Captcha>,
    private readonly configService: ConfigService,
  ) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        'CAPTCHA_SIZE:',
        this.configService.get<number>('CAPTCHA_SIZE'),
      );
      console.log(
        'CAPTCHA_IGNORE_CHARS:',
        this.configService.get<string>('CAPTCHA_IGNORE_CHARS'),
      );
      console.log(
        'CAPTCHA_NOISE:',
        this.configService.get<string>('CAPTCHA_NOISE'),
      );
      console.log(
        'CAPTCHA_WIDTH:',
        this.configService.get<string>('CAPTCHA_WIDTH'),
      );
      console.log(
        'CAPTCHA_HEIGHT:',
        this.configService.get<string>('CAPTCHA_HEIGHT'),
      );
    }
  }

  async generateCaptcha(): Promise<{ id: string; data: string }> {
    try {
      const captcha = svgCaptcha.create({
        size: this.configService.get<number>('CAPTCHA_SIZE'),
        ignoreChars: this.configService.get<string>('CAPTCHA_IGNORE_CHARS'),
        noise: this.configService.get<number>('CAPTCHA_NOISE'),
        width: this.configService.get<number>('CAPTCHA_WIDTH'),
        height: this.configService.get<number>('CAPTCHA_HEIGHT'),
      });

      const captchaEntity = this.captchaRepository.create({
        value: captcha.text,
        expiredAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      const savedCaptcha = await this.captchaRepository.save(captchaEntity);

      // 返回验证码图片的Base64编码
      const base64Image = `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`;

      this.logger.log(`生成图片验证码成功`);
      return {
        id: savedCaptcha.id,
        data: base64Image,
      };
    } catch (error) {
      this.logger.error('生成图片验证码失败', error);
      throw new ExpectedError(ErrorCode.GENERATE_CAPTCHA_FAILED);
    }
  }

  async getCaptcha(): Promise<ApiResponse<{ id: string; data: string }>> {
    try {
      const { id, data } = await this.generateCaptcha();
      return createSuccessResponse<{ id: string; data: string }>(
        {
          id,
          data,
        },
        'GET_CAPTCHA_SUCCEED',
      );
    } catch (error) {
      this.logger.error('获取图片验证码失败', error);

      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      return createErrorResponse(ErrorCode.GET_CAPTCHA_FAILED);
    }
  }

  async validateCaptchaInternally(
    captchaId: string,
    code: string,
  ): Promise<void> {
    const captcha = await this.captchaRepository.findOne({
      where: { id: captchaId },
    });

    if (
      !captcha ||
      captcha.expiredAt.getTime() < Date.now() ||
      captcha.isUsed
    ) {
      throw new ExpectedError(ErrorCode.INVALID_CAPTCHA);
    }

    // 不区分大小写
    if (captcha.value.toLowerCase() !== code.toLowerCase()) {
      throw new ExpectedError(ErrorCode.CAPTCHA_INCORRECT);
    }

    // 验证成功，标记为已使用
    captcha.isUsed = true;

    await this.captchaRepository.save(captcha);
  }

  async verifyCaptcha(
    verifyCaptchaDto: VerifyCaptchaDto,
  ): Promise<ApiResponse<string>> {
    const { captchaId, code } = verifyCaptchaDto;

    try {
      await this.validateCaptchaInternally(captchaId, code);
      this.logger.log('验证码校验成功');
      return createSuccessResponse(null, 'CAPTCHA_VERIFICATION_SUCCEED');
    } catch (error) {
      this.logger.error(`验证码校验失败，captchaId: ${captchaId}`, error);

      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      return createErrorResponse(ErrorCode.CAPTCHA_VERIFICATION_FAILED);
    }
  }

  async removeExpiredCaptcha(): Promise<void> {
    try {
      const result = await this.captchaRepository.delete({
        expiredAt: LessThan(new Date()),
      });

      this.logger.log(`成功删除了 ${result.affected} 条过期验证码。`);
    } catch (error) {
      this.logger.error('删除过期验证码时发生错误：', error);
    }
  }

  async getCodeForTesting(captchaId: string): Promise<ApiResponse<string>> {
    const captcha = await this.captchaRepository.findOne({
      where: { id: captchaId },
    });

    if (!captcha) {
      return createErrorResponse(ErrorCode.CAPTCHA_NOT_FOUND);
    }

    return createSuccessResponse(captcha.value, 'GET_CAPTCHA_CODE_SUCCEED');
  }
}
