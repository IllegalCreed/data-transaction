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
  Query,
  UseGuards,
} from '@nestjs/common';
import { SceneService } from './scene.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { GetListDto } from 'src/common/dto/get-list.dto';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import { GetOptionsByTitleDto } from './dto/get-options-by-title.dto';
import { IOption } from 'src/common/interfaces/option.interface';
import { GetOptionsByIdDto } from './dto/get-options-by-id.dto';
import { Scene } from 'src/entities/scene.entity';
import { UpsertSceneDto } from './dto/upsert-scene.dto';
import { SceneDetail } from './interface/scene-detail.interface';
import { DeleteDto } from 'src/common/dto/delete.dto';
import { ChangeStatusDto } from 'src/common/dto/change-status.dto';

@Controller('platform/scene')
export class SceneController {
  private readonly logger = new Logger(SceneController.name);

  constructor(private readonly sceneService: SceneService) {}

  /**
   * 获取场景列表
   * POST /platform/scene/list
   *
   * @param dto GetListDto
   * @returns ApiResponse
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async getCompanies(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.sceneService.getList(dto);
      this.logger.log(`获取场景列表成功`);
      return createSuccessResponse(
        {
          rows: records,
          total,
          pageNum,
          pageSize,
        },
        'GET_SCENE_LIST_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取场景列表失败', error);
      return createErrorResponse(ErrorCode.GET_SCENE_LIST_FAILED);
    }
  }

  /**
   * 创建或更新场景
   * POST /platform/scene/upsert
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('upsert')
  @HttpCode(HttpStatus.OK)
  async upsertScene(@Body() dto: UpsertSceneDto): Promise<ApiResponse<Scene>> {
    try {
      const scene = await this.sceneService.upsertScene(dto);
      this.logger.log(`场景信息保存成功: ${scene.id}`);
      return createSuccessResponse(null, 'UPSERT_SCENE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`场景信息保存失败`, error);
      return createErrorResponse(ErrorCode.UPSERT_SCENE_FAILED);
    }
  }

  /**
   * 批量修改场景状态
   * POST /platform/scene/change-status
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin) // 仅管理员可操作
  @Post('change-status')
  @HttpCode(HttpStatus.OK)
  async changeStatus(
    @Body() dto: ChangeStatusDto,
  ): Promise<ApiResponse<string>> {
    const { ids, status } = dto;

    try {
      await this.sceneService.changeStatus(ids, status);
      this.logger.log(`修改场景状态成功: ids=[${ids}], status=${status}`);
      return createSuccessResponse(null, 'UPDATE_SCENE_STATUS_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`修改场景状态失败: ids=[${ids}]`, error);
      return createErrorResponse(ErrorCode.UPDATE_SCENE_STATUS_FAILED);
    }
  }

  /**
   * 批量删除场景（软删除）
   * POST /platform/scene/delete
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin) // 仅管理员可操作
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Body() dto: DeleteDto): Promise<ApiResponse<string>> {
    const { ids } = dto;

    try {
      await this.sceneService.delete(ids);
      this.logger.log(`删除场景成功: ids=[${ids}]`);
      return createSuccessResponse(null, 'DELETE_SCENE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`删除场景失败: ids=[${ids}]`, error);
      return createErrorResponse(ErrorCode.DELETE_SCENE_FAILED);
    }
  }

  /**
   * 根据场景名称进行模糊搜索，返回 IOption 数组
   * GET /platform/scene/get-options-by-title?title=xxx
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get('get-options-by-title')
  @HttpCode(HttpStatus.OK)
  async getOptionsByTitle(
    @Query() dto: GetOptionsByTitleDto,
  ): Promise<ApiResponse<IOption[]>> {
    const { title } = dto;

    try {
      const options = await this.sceneService.getOptionsByTitle(title);
      this.logger.log(
        `根据名称搜索场景成功: title=${title}, found=${options.length}`,
      );
      return createSuccessResponse(
        options,
        'GET_SCENE_OPTIONS_BY_TITLE_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`根据名称搜索场景失败: title=${title}`, error);
      return createErrorResponse(ErrorCode.GET_SCENE_OPTIONS_BY_TITLE_FAILED);
    }
  }

  /**
   * 根据场景ID查询，返回 IOption 数组
   * GET /platform/scene/get-options-by-id?id=xxx
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get('get-options-by-id')
  @HttpCode(HttpStatus.OK)
  async getOptionsById(
    @Query() dto: GetOptionsByIdDto,
  ): Promise<ApiResponse<IOption[]>> {
    const { id } = dto;

    try {
      const options = await this.sceneService.getOptionsById(id);
      this.logger.log(`根据ID查询场景成功: id=${id}`);
      return createSuccessResponse(options, 'GET_SCENE_OPTIONS_BY_ID_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`根据ID查询场景失败: id=${id}`, error);
      return createErrorResponse(ErrorCode.GET_SCENE_OPTIONS_BY_ID_FAILED);
    }
  }

  /**
   * 获取场景详情
   * GET /platform/scene/:id
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSceneDetail(
    @Param('id') id: string,
  ): Promise<ApiResponse<SceneDetail>> {
    const sceneId = parseInt(id, 10);
    if (Number.isNaN(sceneId)) {
      throw new BadRequestException('Invalid scene ID');
    }

    try {
      const sceneDetail = await this.sceneService.getSceneDetail(sceneId);
      this.logger.log(`获取场景详情成功: id=${id}`);
      return createSuccessResponse(sceneDetail, 'GET_SCENE_DETAIL_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error(`获取场景详情失败: id=${id}`, error);
      return createErrorResponse(ErrorCode.GET_SCENE_DETAIL_FAILED);
    }
  }
}
