import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
}
