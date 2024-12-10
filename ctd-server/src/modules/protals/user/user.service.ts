import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { UserStatus } from 'src/enums/user-status.enum';
import { UserType } from 'src/enums/user-type.enum';
import { IUserInfoData } from './interface/user-info.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserInfo(
    userId: number,
  ): Promise<ApiResponse<{ email: string; userType: string; status: string }>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['individualInfo', 'enterpriseInfo'],
    });

    if (!user) {
      this.logger.warn(`获取用户信息失败，用户不存在：${userId}`);
      return createErrorResponse(ErrorCode.GET_USERINFO_FAILED);
    }

    if (user.status !== UserStatus.ACTIVE) {
      this.logger.warn(
        `获取用户信息失败，用户状态不允许：${user.email}, 状态：${user.status}`,
      );
      return createErrorResponse(ErrorCode.GET_USERINFO_FAILED);
    }

    let data: IUserInfoData = {
      email: user.email,
      userType: user.userType,
      status: user.status,
    };
    if (user.userType === UserType.Individual && user.individualInfo) {
      data = {
        ...data,
        fullName: user.individualInfo.fullName,
        phoneNumber: user.individualInfo.phoneNumber,
        identificationNumber: user.individualInfo.identificationNumber,
        gender: user.individualInfo.gender,
        dateOfBirth: user.individualInfo.dateOfBirth,
        residentialAddress: user.individualInfo.residentialAddress,
      };
    } else if (user.userType === UserType.Enterprise && user.enterpriseInfo) {
      data = {
        ...data,
        enterpriseName: user.enterpriseInfo.enterpriseName,
        enterpriseDescription: user.enterpriseInfo.enterpriseDescription,
        registrationNumber: user.enterpriseInfo.registrationNumber,
        contactPersonName: user.enterpriseInfo.contactPersonName,
        contactPersonTitle: user.enterpriseInfo.contactPersonTitle,
        contactPhoneNumber: user.enterpriseInfo.contactPhoneNumber,
        enterpriseAddress: user.enterpriseInfo.enterpriseAddress,
        industryType: user.enterpriseInfo.industryType,
        companySize: user.enterpriseInfo.companySize,
      };
    }
    this.logger.log(`获取用户信息成功：${user.email}`);
    return createSuccessResponse(data, 'GET_USER_INFO_SUCCEED');
  }

  async updateUserAvatar(
    userId: number,
    avatarUrl: string,
  ): Promise<ApiResponse<string>> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`更新头像失败：用户不存在：${userId}`);
      return createErrorResponse(ErrorCode.UPDATE_USER_AVATAR_FAILED);
    }

    user.avatarUrl = avatarUrl;
    try {
      await this.userRepository.save(user);
      this.logger.log(`更新头像成功：${user.email}`);
      return createSuccessResponse('AVATAR_UPDATED');
    } catch (error) {
      this.logger.error('更新头像失败', error);
      return createErrorResponse(ErrorCode.UPDATE_USER_AVATAR_FAILED);
    }
  }
}
