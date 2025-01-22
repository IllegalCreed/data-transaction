import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
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

@Controller('platform/scene')
export class SceneController {
  private readonly logger = new Logger(SceneController.name);

  constructor(private readonly sceneService: SceneService) {}

  /**
   * 获取场景列表
   * POST /platform/company/list
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

      this.logger.error('获取公司列表失败', error);
      return createErrorResponse(ErrorCode.GET_SCENE_LIST_FAILED);
    }
  }
}
