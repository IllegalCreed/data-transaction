import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
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

@Controller('platform/news')
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(private readonly newsService: NewsService) {}

  /**
   * 获取新闻列表
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
      this.logger.log('获取新闻列表成功');
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
      this.logger.error('获取新闻列表失败', error);
      return createErrorResponse(ErrorCode.LIST_NEWS_FAILED);
    }
  }
}
