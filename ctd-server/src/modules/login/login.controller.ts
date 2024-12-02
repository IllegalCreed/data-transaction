import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CheckCaptchaDto } from './dto/check-captcha.dto';
import { LoginDto } from './dto/login.dto';
import { GetLoginLogsDto } from './dto/get-login-logs.dto';
import { LoginLogDto } from './dto/login-log.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // 检查是否需要验证码
  @Post('check-captcha')
  async checkCaptcha(
    @Body() checkCaptchaDto: CheckCaptchaDto,
  ): Promise<boolean> {
    return await this.loginService.checkCaptcha(checkCaptchaDto.email);
  }

  // 登录
  @Post()
  async login(
    @Body() loginDto: LoginDto,
    @Request() req,
  ): Promise<{
    token?: string;
    requiresCaptcha?: boolean;
  }> {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'] || '';
    return await this.loginService.login(loginDto, ipAddress, userAgent);
  }

  @Get('logs')
  @UseGuards(AuthGuard)
  async getLoginLogs(
    @Request() req,
    @Query() getLoginLogsDto: GetLoginLogsDto,
  ): Promise<{ data: LoginLogDto[]; total: number }> {
    const userId = req.user;
    return await this.loginService.getLoginLogs(userId, getLoginLogsDto);
  }

  @Get('last-log')
  @UseGuards(AuthGuard)
  async getLastLoginLog(@Request() req): Promise<LoginLogDto> {
    const userId = req.user;
    return await this.loginService.getLastLoginLog(userId);
  }
}
