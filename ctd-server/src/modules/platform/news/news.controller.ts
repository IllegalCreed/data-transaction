import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { GetListDto } from 'src/common/dto/get-list.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { UpsertNewsDto } from './dto/upsert-news.dto';
import { News } from 'src/entities/news.entity';
import { ChangeStatusDto } from 'src/common/dto/change-status.dto';
import { DeleteDto } from 'src/common/dto/delete.dto';
import { GetOptionsByTitleDto } from './dto/get-options-by-title.dto';
import { IOption } from 'src/common/interfaces/option.interface';
import { GetOptionsByIdDto } from './dto/get-options-by-id.dto';
import { GetNewsDetailDto } from './dto/get-news-detail.dto';
import { BaseNews } from './interface/base-news.interface';

@Controller('platform/news')
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(private readonly newsService: NewsService) {}

  /**
   * 获取资讯列表
   * POST /platform/news/list
   *
   * @param dto GetListDto
   * @returns ApiResponse
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async getNewsList(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.newsService.getList(dto);
      this.logger.log('获取资讯列表成功');
      return createSuccessResponse(
        {
          rows: records,
          total,
          pageNum,
          pageSize,
        },
        'LIST_NEWS_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('获取资讯列表失败', error);
      return createErrorResponse(ErrorCode.LIST_NEWS_FAILED);
    }
  }

  /**
   * 创建或更新资讯
   * POST /platform/news/upsert
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('upsert')
  @HttpCode(HttpStatus.OK)
  async upsertNews(@Body() dto: UpsertNewsDto): Promise<ApiResponse<News>> {
    try {
      const news = await this.newsService.upsertNews(dto);
      this.logger.log(`资讯信息保存成功: ${news.id}`);
      return createSuccessResponse(null, 'UPSERT_NEWS_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`资讯信息保存失败`, error);
      return createErrorResponse(ErrorCode.UPSERT_NEWS_FAILED);
    }
  }

  /**
   * 批量修改资讯状态
   * POST /platform/news/change-status
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('change-status')
  @HttpCode(HttpStatus.OK)
  async changeStatus(
    @Body() dto: ChangeStatusDto,
  ): Promise<ApiResponse<string>> {
    const { ids, status } = dto;

    try {
      await this.newsService.changeStatus(ids, status);
      this.logger.log(`修改资讯状态成功: ids=[${ids}], status=${status}`);
      return createSuccessResponse(null, 'UPDATE_NEWS_STATUS_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`修改资讯状态失败: ids=[${ids}]`, error);
      return createErrorResponse(ErrorCode.UPDATE_NEWS_STATUS_FAILED);
    }
  }

  /**
   * 批量删除资讯（软删除）
   * POST /platform/news/delete
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Body() dto: DeleteDto): Promise<ApiResponse<string>> {
    const { ids } = dto;

    try {
      await this.newsService.delete(ids);
      this.logger.log(`删除资讯成功: ids=[${ids}]`);
      return createSuccessResponse(null, 'DELETE_NEWS_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`删除资讯失败: ids=[${ids}]`, error);
      return createErrorResponse(ErrorCode.DELETE_NEWS_FAILED);
    }
  }

  /**
   * 根据资讯名称进行模糊搜索，返回 IOption 数组
   * GET /platform/news/get-options-by-title?title=xxx
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
      const options = await this.newsService.getOptionsByTitle(title);
      this.logger.log(`根据名称搜索资讯成功: title=${title}`);
      return createSuccessResponse(
        options,
        'GET_NEWS_OPTIONS_BY_TITLE_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`根据名称搜索资讯失败: title=${title}`, error);
      return createErrorResponse(ErrorCode.GET_NEWS_OPTIONS_BY_TITLE_FAILED);
    }
  }

  /**
   * 根据资讯ID查询，返回 IOption 数组
   * GET /platform/news/get-options-by-id?id=xxx
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
      const options = await this.newsService.getOptionsById(id);
      this.logger.log(`根据ID查询资讯成功: id=${id}`);
      return createSuccessResponse(options, 'GET_NEWS_OPTIONS_BY_ID_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`根据ID查询资讯失败: id=${id}`, error);
      return createErrorResponse(ErrorCode.GET_NEWS_OPTIONS_BY_ID_FAILED);
    }
  }

  /**
   * 获取资讯详情
   * GET /platform/news/:id
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getNewsDetail(
    @Param() dto: GetNewsDetailDto,
  ): Promise<ApiResponse<BaseNews>> {
    const { id } = dto;

    try {
      const newsDetail = await this.newsService.getNewsDetail(id);
      this.logger.log(`获取资讯详情成功: id=${id}`);
      return createSuccessResponse(newsDetail, 'GET_NEWS_DETAIL_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`获取资讯详情失败: id=${id}`, error);
      return createErrorResponse(ErrorCode.GET_NEWS_DETAIL_FAILED);
    }
  }
}
