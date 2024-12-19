import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('platform/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取个人用户信息
  @Get(':userId')
  async getIndividualUser(
    @Param('userId') userId: number,
  ): Promise<ApiResponse<UserInfoDto>> {
    return this.userService.getIndividualUser(userId);
  }
}
