import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
  Param,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { BannerService } from './banner.service';
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
import { UpsertBannerDto } from './dto/upsert-banner.dto';
import { Banner } from 'src/entities/banner.entity';
import { ChangeStatusDto } from 'src/common/dto/change-status.dto';
import { DeleteDto } from 'src/common/dto/delete.dto';
import { BannerDetail } from './interface/banner-detail.interface';

@Controller('platform/banner')
export class BannerController {
  private readonly logger = new Logger(BannerController.name);

  constructor(private readonly bannerService: BannerService) {}

  /**
   * 获取Banner列表
   * POST /platform/banner/list
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async getBannerList(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.bannerService.getList(dto);
      this.logger.log('获取横幅列表成功');
      return createSuccessResponse(
        { rows: records, total, pageNum, pageSize },
        'LIST_BANNER_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('获取横幅列表失败', error);
      return createErrorResponse(ErrorCode.LIST_BANNER_FAILED);
    }
  }

  /**
   * 创建或更新Banner
   * POST /platform/banner/upsert
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('upsert')
  @HttpCode(HttpStatus.OK)
  async upsertBanner(
    @Body() dto: UpsertBannerDto,
  ): Promise<ApiResponse<Banner>> {
    try {
      const banner = await this.bannerService.upsertBanner(dto);
      this.logger.log(`横幅信息保存成功: ${banner.id}`);
      return createSuccessResponse(null, 'UPSERT_BANNER_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`横幅信息保存失败`, error);
      return createErrorResponse(ErrorCode.UPSERT_BANNER_FAILED);
    }
  }

  /**
   * 批量修改 Banner 状态
   * POST /platform/banner/change-status
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
      await this.bannerService.changeStatus(ids, status);
      this.logger.log(`修改 Banner 状态成功: ids=[${ids}], status=${status}`);
      return createSuccessResponse(null, 'UPDATE_BANNER_STATUS_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`修改 Banner 状态失败: ids=[${ids}]`, error);
      return createErrorResponse(ErrorCode.UPDATE_BANNER_STATUS_FAILED);
    }
  }

  /**
   * 批量删除 Banner（软删除）
   * POST /platform/banner/delete
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Body() dto: DeleteDto): Promise<ApiResponse<string>> {
    const { ids } = dto;
    try {
      await this.bannerService.delete(ids);
      this.logger.log(`删除 Banner 成功: ids=[${ids}]`);
      return createSuccessResponse(null, 'DELETE_BANNER_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`删除 Banner 失败: ids=[${ids}]`, error);
      return createErrorResponse(ErrorCode.DELETE_BANNER_FAILED);
    }
  }

  /**
   * 获取 Banner 详情
   * GET /platform/banner/:id
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBannerDetail(
    @Param('id') id: string,
  ): Promise<ApiResponse<BannerDetail>> {
    const bannerId = parseInt(id, 10);
    if (Number.isNaN(bannerId)) {
      throw new BadRequestException('Invalid banner ID');
    }

    try {
      const bannerDetail = await this.bannerService.getBannerDetail(bannerId);
      this.logger.log(`获取 Banner 详情成功: id=${id}`);
      return createSuccessResponse(bannerDetail, 'GET_BANNER_DETAIL_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error(`获取 Banner 详情失败: id=${id}`, error);
      return createErrorResponse(ErrorCode.GET_BANNER_DETAIL_FAILED);
    }
  }
}
