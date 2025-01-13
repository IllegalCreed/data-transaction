import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { ChangeUserStatusDto } from './dto/change-user-status.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

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

    try {
      const data = await this.userService.getIndividualUser(idNum);
      this.logger.log(`个人用户信息获取成功: userId=${userId}`);
      return createSuccessResponse(data, 'GET_INDIVIDUAL_USER_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取个人用户详情失败', error);
      return createErrorResponse(ErrorCode.GET_USER_DETAIL_FAILED);
    }
  }

  /**
   * 批量修改用户状态
   * POST /platform/user/change-status
   * @param dto 包含 { ids, status }
   */
  @UseGuards(AuthGuard)
  @Post('change-status')
  @HttpCode(HttpStatus.OK)
  async changeUserStatus(
    @Body() dto: ChangeUserStatusDto,
  ): Promise<ApiResponse<string>> {
    const { ids, status } = dto;

    try {
      await this.userService.changeUserStatus(ids, status);
      this.logger.log(`修改用户状态成功: ids=[${ids}], status=${status}`);
      return createSuccessResponse(null, 'CHANGE_USER_STATUS_SUCCEED');
    } catch (error) {
      this.logger.error(`修改用户状态失败: ids=[${ids}]`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      return createErrorResponse(ErrorCode.UPDATE_USER_STATUS_FAILED);
    }
  }

  /**
   * 批量删除用户（软删除）
   * POST /platform/user/delete
   * @param dto { ids: number[] } 要删除的用户 ID
   */
  @UseGuards(AuthGuard) // 若仅限已登录且有特定权限的管理员可调用
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Body() dto: DeleteUserDto): Promise<ApiResponse<string>> {
    const { ids } = dto;

    try {
      await this.userService.deleteUser(ids);
      this.logger.log(`删除用户成功: ids=[${ids}]`);
      return createSuccessResponse(null, 'DELETE_USER_SUCCEED');
    } catch (error) {
      this.logger.error(`删除用户失败: ids=[${ids}]`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      return createErrorResponse(ErrorCode.DELETE_USER_FAILED);
    }
  }
}
