import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getInfo(
    @Request() req,
  ): Promise<ApiResponse<{ email: string; userType: string; status: string }>> {
    const userId = req.user?.sub;
    if (!userId) {
      // 理论上走不到这里，因为全局守卫会阻止未登录用户访问
      throw new BadRequestException('No user id found in token.');
    }

    return this.userService.getUserInfo(Number(userId));
  }

  @Patch('avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars', // 上传文件的存放路径
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadAvatar(
    @Request() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|webp|gif|bmp)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 2,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<ApiResponse<string>> {
    const userId = req.user?.sub;
    if (!userId) {
      // 理论上走不到这里，因为全局守卫会阻止未登录用户访问
      throw new BadRequestException('No user id found in token.');
    }

    if (!file) {
      throw new BadRequestException('No file found in request.');
    }

    // 构造文件访问URL路径
    const avatarUrl = `uploads/avatars/${file.filename}`;
    return this.userService.updateUserAvatar(userId, avatarUrl);
  }
}
