import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('forgot')
export class ForgotController {
  constructor(private readonly forgotService: ForgotService) {}

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ApiResponse<string>> {
    return this.forgotService.resetPassword(resetPasswordDto);
  }
}
