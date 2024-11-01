import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ActivateAccountDto } from './dto/activate-account.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.register(createUserDto);
  }

  @Post('activate')
  @HttpCode(HttpStatus.OK)
  async activateAccount(
    @Body() activateAccountDto: ActivateAccountDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.activateAccount(activateAccountDto);
  }
}
