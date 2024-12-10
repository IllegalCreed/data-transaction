import { BadRequestException, Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getInfo(
    @Request() req,
  ): Promise<ApiResponse<{ email: string; userType: string; status: string }>> {
    const userId = req.user?.sub;
    if (!userId) {
      // 理论上走不到这里，因为全局守卫会阻止未登录用户访问
      throw new BadRequestException('No user id found in token.');
    }

    return this.userService.getUserInfo(Number(userId));
  }
}
