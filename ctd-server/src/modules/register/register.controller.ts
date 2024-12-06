import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ResendActivationEmailDto } from './dto/resend-activation-email.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Public } from 'src/common/decorators/is-public.decorator';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Public()
  @Post()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.register(createUserDto);
  }

  @Public()
  @Post('activate')
  async activateAccount(
    @Body() activateAccountDto: ActivateAccountDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.activateAccount(activateAccountDto);
  }

  @Public()
  @Post('resend-activation-email')
  async resendActivationEmail(
    @Body() resendActivationEmailDto: ResendActivationEmailDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.resendActivationEmail(resendActivationEmailDto);
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async removeExpiredTokens() {
    this.registerService.removeExpiredToken();
  }

  @Public()
  @Get('test/get-activation-token')
  async getActivationTokenForTesting(
    @Query('email') email: string,
  ): Promise<ApiResponse<string>> {
    // 在非生产环境中，禁止使用此端点
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv !== 'development') {
      throw new BadRequestException(
        'This endpoint is only available in testing environments.',
      );
    }

    // 测试接口，不使用DTO，简化处理
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    return this.registerService.getActivationTokenForTesting(email);
  }
}
