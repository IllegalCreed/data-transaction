import { Controller, Post, Body, Get, Query, Request } from '@nestjs/common';
import { LoginService } from './login.service';
import { CheckCaptchaDto } from './dto/check-captcha.dto';
import { LoginDto } from './dto/login.dto';
import { GetLoginLogsDto } from './dto/get-login-logs.dto';
import { LoginLogDto } from './dto/login-log.dto';
import { Public } from 'src/common/decorators/is-public.decorator';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post('check-captcha')
  async checkCaptcha(
    @Body() checkCaptchaDto: CheckCaptchaDto,
  ): Promise<ApiResponse<boolean>> {
    return this.loginService.checkCaptcha(checkCaptchaDto);
  }

  @Public()
  @Post()
  async login(
    @Body() loginDto: LoginDto,
    @Request() req,
  ): Promise<ApiResponse<{ token?: string; requiresCaptcha?: boolean }>> {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'] || '';
    return this.loginService.login(loginDto, ipAddress, userAgent);
  }

  @Get('logs')
  async getLoginLogs(
    @Request() req,
    @Query() getLoginLogsDto: GetLoginLogsDto,
  ): Promise<ApiResponse<{ data: LoginLogDto[]; total: number }>> {
    const userId = req.user?.sub; // 提取 userId
    return this.loginService.getLoginLogs(userId, getLoginLogsDto);
  }

  @Get('last-log')
  async getLastLoginLog(@Request() req): Promise<ApiResponse<LoginLogDto>> {
    const userId = req.user?.sub;
    return this.loginService.getLastLoginLog(userId);
  }
}
