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
import { IndividualUserDetailData } from './interface/individual-user-detail.interface';
import { ChangeUserStatusDto } from './dto/change-user-status.dto';
import { IndividualService } from './Individual.service';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseUserDetailData } from './interface/enterprise-user-detail.interface';
import { UserRole } from 'src/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { DeleteDto } from 'src/common/dto/delete.dto';

@Controller('platform/user')
export class UserController {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userService: UserService,
    private readonly individualService: IndividualService,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  /**
   * 获取个人用户列表
   * POST /platform/user/individual
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('individual')
  async getIndividualUsers(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.individualService.getList(dto);
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get('individual/:userId')
  async getIndividualUser(
    @Param('userId') userId: string,
  ): Promise<ApiResponse<IndividualUserDetailData>> {
    const idNum = parseInt(userId, 10);
    if (Number.isNaN(idNum)) {
      throw new BadRequestException(
        'Invalid user ID. Please provide a valid user ID.',
      );
    }

    try {
      const data = await this.individualService.getIndividualUser(idNum);
      this.logger.log(`获取个人用户详情成功: userId=${userId}`);
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
   * 获取企业用户列表
   * POST /platform/user/enterprise
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('enterprise')
  async getEnterpriseUsers(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.enterpriseService.getList(dto);
      this.logger.log(`获取企业用户列表成功`);
      return createSuccessResponse(
        {
          rows: records,
          total,
          pageNum,
          pageSize,
        },
        'GET_ENTERPRISE_USERS_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取企业用户列表失败', error);
      return createErrorResponse(ErrorCode.GET_USER_LIST_FAILED);
    }
  }

  /**
   * 获取企业用户详情
   * GET /platform/user/enterprise/:id
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get('enterprise/:userId')
  async getEnterpriseUser(
    @Param('userId') userId: string,
  ): Promise<ApiResponse<EnterpriseUserDetailData>> {
    const idNum = parseInt(userId, 10);
    if (Number.isNaN(idNum)) {
      throw new BadRequestException(
        'Invalid user ID. Please provide a valid user ID.',
      );
    }

    try {
      const data = await this.enterpriseService.getEnterpriseUser(idNum);
      this.logger.log(`获取企业用户详情成功: userId=${userId}`);
      return createSuccessResponse(data, 'GET_ENTERPRISE_USER_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取企业用户详情失败', error);
      return createErrorResponse(ErrorCode.GET_USER_DETAIL_FAILED);
    }
  }

  /**
   * 批量修改用户状态
   * POST /platform/user/change-status
   * @param dto 包含 { ids, status }
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Body() dto: DeleteDto): Promise<ApiResponse<string>> {
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
