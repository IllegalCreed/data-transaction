import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { createSuccessResponse } from 'src/common/utils/response';

@Controller('file')
export class FileController {
  private readonly logger = new Logger(FileController.name);

  @Post('upload')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files', // 存放文件的路径
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 最大上传文件大小 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<ApiResponse<string>> {
    if (!file) {
      throw new BadRequestException('No file found in the request.');
    }

    // 构造文件访问URL路径
    const fileUrl = `uploads/files/${file.filename}`;
    this.logger.log(`上传文件成功`);
    return createSuccessResponse(fileUrl, 'UPLOAD_FILE_SUCCEED');
  }
}
