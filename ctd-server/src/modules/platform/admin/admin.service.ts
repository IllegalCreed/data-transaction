import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { hashPassword, verifyPassword } from 'src/common/utils/security';
import { ExpectedError } from 'src/types/error';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async updatePassword(
    adminId: number,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<ApiResponse<string>> {
    // 查询管理员信息
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin) {
      this.logger.warn(`管理员密码更新失败：管理员不存在，ID: ${adminId}`);
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    // 验证旧密码
    const isPasswordValid = await verifyPassword(oldPassword, admin.password);
    if (!isPasswordValid) {
      this.logger.warn(`管理员密码更新失败：密码错误，管理员ID: ${adminId}`);
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
    }

    try {
      // 哈希新密码并保存
      const hashedPassword = await hashPassword(newPassword);
      admin.password = hashedPassword;
      await this.adminRepository.save(admin);
      this.logger.log(`管理员密码更新成功，ID: ${adminId}`);
      return createSuccessResponse(null, 'UPDATE_ADMIN_PASSWORD_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error(
        `管理员密码更新失败：未知错误，管理员ID: ${adminId}`,
        error,
      );
      return createErrorResponse(ErrorCode.UPDATE_ADMIN_PASSWORD_FAILED);
    }
  }
}
