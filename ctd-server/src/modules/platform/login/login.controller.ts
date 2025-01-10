import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('platform/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ApiResponse<{ token?: string }>> {
    return this.loginService.login(loginDto);
  }

  @Post('test/create')
  @HttpCode(HttpStatus.OK)
  async createAdminForTesting(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<ApiResponse<string>> {
    // 在非生产环境中，禁止使用此端点
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv !== 'development') {
      throw new BadRequestException(
        'This endpoint is only available in testing environments.',
      );
    }
    return this.loginService.createAdminForTesting(createAdminDto);
  }
}
