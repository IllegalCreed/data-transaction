import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { UserInfoDto } from './dto/user-info.dto';
import { GetIndividualUsersDto } from './dto/get-individual-users.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('platform/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取个人用户列表
   * POST /platform/user/individual
   */
  @UseGuards(AuthGuard)
  @Post('individual')
  async getIndividualUsers(
    @Body() queryDto: GetIndividualUsersDto,
  ): Promise<ApiResponse<any>> {
    // 由service处理搜索、筛选、排序、分页等逻辑
    return this.userService.getIndividualUsers(queryDto);
  }

  // 获取个人用户信息
  @Get(':userId')
  async getIndividualUser(
    @Param('userId') userId: number,
  ): Promise<ApiResponse<UserInfoDto>> {
    return this.userService.getIndividualUser(userId);
  }
}
