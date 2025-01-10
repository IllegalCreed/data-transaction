import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  /**
   * 验证当前密码
   * POST /change-password/verify-password
   * @param verifyDto 验证当前密码的DTO
   * @param req 请求对象，包含用户信息
   * @returns ApiResponse<string>
   */
  @UseGuards(AuthGuard)
  @Post('verify-password')
  @HttpCode(HttpStatus.OK)
  async verifyPassword(
    @Body() verifyDto: VerifyPasswordDto,
    @Request() req,
  ): Promise<ApiResponse<string>> {
    const userId = req.user?.sub;

    if (!userId) {
      throw new BadRequestException('No user id found in token.');
    }

    return this.changePasswordService.verifyPassword(userId, verifyDto);
  }

  /**
   * 修改用户密码
   * POST /change-password
   * @param changePasswordDto 修改密码的DTO
   * @param req 请求对象，包含用户信息
   * @returns ApiResponse<string>
   */
  @UseGuards(AuthGuard)
  @Post('')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ): Promise<ApiResponse<string>> {
    const userId = req.user?.sub;

    if (!userId) {
      throw new BadRequestException('No user id found in token.');
    }

    return this.changePasswordService.changePassword(userId, changePasswordDto);
  }
}
