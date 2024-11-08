import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ResendVerificationEmailDto } from './dto/resend-verification-email.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.register(createUserDto);
  }

  @Post('activate')
  async activateAccount(
    @Body() activateAccountDto: ActivateAccountDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.activateAccount(activateAccountDto);
  }

  @Post('resend-verification-email')
  async resendVerificationEmail(
    @Body() resendVerificationEmailDto: ResendVerificationEmailDto,
  ): Promise<ApiResponse<string>> {
    return this.registerService.resendVerificationEmail(
      resendVerificationEmailDto,
    );
  }
}
