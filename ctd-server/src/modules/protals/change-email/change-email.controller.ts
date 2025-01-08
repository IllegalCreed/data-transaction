import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ExpectedError } from 'src/types/error';

@Controller('change-email')
export class ChangeEmailController {
  private readonly logger = new Logger(ChangeEmailController.name);
  constructor(private readonly changeEmailService: ChangeEmailService) {}

  /**
   * 测试方法：获取一个可用的救援代码
   * 用于前端 E2E 测试
   */
  @UseGuards(AuthGuard)
  @Get('test/get-recovery-code')
  @HttpCode(HttpStatus.OK)
  async getUsableRecoveryCodeForTest(
    @Request() req,
  ): Promise<ApiResponse<string>> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new BadRequestException('No user id found in token.');
    }

    try {
      const code = await this.changeEmailService.getRecoveryCodeForTest(userId);
      this.logger.log(`获取救援代码成功：userId=${userId}, code=${code}`);
      return createSuccessResponse(code, 'GET_RECOVERY_CODE_SUCCEED');
    } catch (error) {
      this.logger.error(`测试方法：获取可用恢复码失败 userId=${userId}`, error);
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('获取救援代码失败：', error);
      return createErrorResponse(ErrorCode.GET_RECOVERY_CODE_FAILED);
    }
  }
}
