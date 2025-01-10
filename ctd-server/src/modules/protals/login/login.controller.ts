import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  HttpCode,
  Patch,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { GetLoginLogsDto } from './dto/get-login-logs.dto';
import { ILoginLog } from './interface/login-log.interface';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('check-captcha')
  async checkCaptcha(
    @Body() body: { email: string },
  ): Promise<ApiResponse<boolean>> {
    return this.loginService.checkCaptcha(body.email);
  }

  @Post()
  async login(
    @Body() loginDto: LoginDto,
    @Request() req,
  ): Promise<ApiResponse<{ token?: string; requiresCaptcha?: boolean }>> {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'] || '';
    return this.loginService.login(loginDto, ipAddress, userAgent);
  }

  @UseGuards(AuthGuard)
  @Get('logs')
  async getLoginLogs(
    @Request() req,
    @Query() getLoginLogsDto: GetLoginLogsDto,
  ): Promise<ApiResponse<{ data: ILoginLog[]; total: number }>> {
    const userId = req.user?.sub; // 提取 userId
    return this.loginService.getLoginLogs(userId, getLoginLogsDto);
  }

  @Get('last-log')
  async getLastLoginLog(@Request() req): Promise<ApiResponse<ILoginLog>> {
    const userId = req.user?.sub;
    return this.loginService.getLastLoginLog(userId);
  }

  @Patch('test/reset-user-status')
  @HttpCode(HttpStatus.OK)
  async resetUserStatusForTesting(
    @Body('email') email: string,
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
    return this.loginService.resetUserStatusForTesting(email);
  }
}
