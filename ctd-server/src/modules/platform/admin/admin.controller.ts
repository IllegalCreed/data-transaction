import {
  BadRequestException,
  Body,
  Request,
  Controller,
  Put,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('platform/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard)
  @Put('update-password')
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ApiResponse<string>> {
    const adminId = req.user?.sub;
    if (!adminId) {
      throw new BadRequestException('No admin id found in token.');
    }
    return this.adminService.updatePassword(adminId, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Get('name')
  async getAdminName(@Request() req): Promise<ApiResponse<string>> {
    const adminId = req.user?.sub;
    if (!adminId) {
      throw new BadRequestException('No admin id found in token.');
    }

    return this.adminService.getAdminName(adminId);
  }
}
