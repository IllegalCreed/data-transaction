import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import { GetListDto } from 'src/common/dto/get-list.dto';
import { UpsertCompanyDto } from './dto/upsert-company.dto';
import { Company } from 'src/entities/company.entity';

@Controller('platform/company')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name);

  constructor(private readonly companyService: CompanyService) {}

  /**
   * 获取公司列表
   * POST /platform/company/list
   *
   * @param dto GetListDto
   * @returns ApiResponse
   */
  @UseGuards(AuthGuard) // 若此接口需要登录后才能访问
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async getCompanies(@Body() dto: GetListDto): Promise<ApiResponse<any>> {
    try {
      const { records, total, pageNum, pageSize } =
        await this.companyService.getList(dto);
      this.logger.log(`获取公司列表成功`);
      return createSuccessResponse(
        {
          rows: records,
          total,
          pageNum,
          pageSize,
        },
        'GET_COMPANY_LIST_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取公司列表失败', error);
      return createErrorResponse(ErrorCode.GET_COMPANY_LIST_FAILED);
    }
  }

  /**
   * 批量修改用户状态
   * POST /platform/company/upsert
   * @param dto 包含 { id, companyInfo }
   */
  @Post('upsert')
  @HttpCode(HttpStatus.OK)
  async upsertCompany(
    @Body() dto: UpsertCompanyDto,
  ): Promise<ApiResponse<Company>> {
    try {
      const company = await this.companyService.upsertCompany(dto);
      this.logger.log(`公司信息保存成功: ${company.id}`);
      return createSuccessResponse(company, 'UPSERT_COMPANY_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('公司信息保存失败', error);
      return createErrorResponse(ErrorCode.UPSERT_COMPANY_FAILED);
    }
  }
}
