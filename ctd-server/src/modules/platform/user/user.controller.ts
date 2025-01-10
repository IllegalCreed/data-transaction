import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetListDto } from 'src/common/dto/get-list.dto';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import { IIndividualUserDetailData } from './interface/individual-user-detail.interface';

@Controller('platform/user')
export class UserController {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userService: UserService) {}

  /**
   * 获取个人用户列表
   * POST /platform/user/individual
   */
  @UseGuards(AuthGuard)
  @Post('individual')
  async getIndividualUsers(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.userService.getList(dto);
      this.logger.log(`获取个人用户列表成功`);
      return createSuccessResponse(
        {
          rows: records,
          total,
          pageNum,
          pageSize,
        },
        'GET_INDIVIDUAL_USERS_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取个人用户列表失败', error);
      return createErrorResponse(ErrorCode.GET_USER_LIST_FAILED);
    }
  }

  /**
   * 获取个人用户详情
   * GET /platform/user/individual/:id
   */
  @UseGuards(AuthGuard)
  @Get('individual/:userId')
  async getIndividualUser(
    @Param('userId') userId: string,
  ): Promise<ApiResponse<IIndividualUserDetailData>> {
    const idNum = parseInt(userId, 10);
    if (Number.isNaN(idNum)) {
      throw new BadRequestException(
        'Invalid user ID. Please provide a valid user ID.',
      );
    }
    return this.userService.getIndividualUser(idNum);
  }
}
