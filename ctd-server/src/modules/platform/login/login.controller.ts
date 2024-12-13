import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Public } from 'src/common/decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('platform/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ApiResponse<{ token?: string }>> {
    return this.loginService.login(loginDto);
  }
}
