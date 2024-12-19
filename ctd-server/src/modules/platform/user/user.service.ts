import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(IndividualUserInfo)
    private readonly individualUserInfoRepository: Repository<IndividualUserInfo>,
  ) {}

  // 获取个人用户详细信息
  async getIndividualUser(userId: number): Promise<ApiResponse> {
    try {
      // 根据userId查找用户及其个人信息
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['individualInfo'],
      });

      if (!user || !user.individualInfo) {
        this.logger.warn(`个人用户信息不存在：${userId}`);
        return createErrorResponse(ErrorCode.USER_NOT_FOUND);
      }

      this.logger.log(`获取个人用户信息成功：${userId}`);
      return createSuccessResponse(
        user.individualInfo,
        'GET_INDIVIDUAL_USER_SUCCEED',
      );
    } catch (error) {
      this.logger.error('获取个人用户信息失败', error);
      return createErrorResponse(ErrorCode.GET_USER_FAILED);
    }
  }
}
