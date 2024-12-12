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
import { UserType } from 'src/enums/user-type.enum';
import { IUserInfoData } from './interface/user-info.interface';
import { UpdateIndividualUserDto } from './dto/update-individual-user.dto';
import { UpdateEnterpriseUserDto } from './dto/update-enterprise-user.dto';

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
      this.logger.warn(`获取用户信息失败：用户不存在：${userId}`);
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    let data: IUserInfoData = {
      email: user.email,
      userType: user.userType,
      avatarUrl: user.avatarUrl,
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

  async updateIndividualInfo(
    userId: number,
    dto: UpdateIndividualUserDto,
  ): Promise<ApiResponse<string>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['individualInfo'],
    });

    if (!user) {
      this.logger.warn(`更新个人用户信息失败：用户不存在：${userId}`);
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    if (user.userType !== UserType.Individual) {
      this.logger.warn(
        `用户类型不匹配，无法更新个人信息：${user.email}, 类型：${user.userType}`,
      );
      return createErrorResponse(ErrorCode.UPDATE_USER_FAILED);
    }

    if (!user.individualInfo) {
      // 如果没有individualInfo记录，需要根据业务决定是创建还是报错。
      // 假设必须已存在:
      this.logger.warn(`用户无个人信息记录：${user.email}`);
      return createErrorResponse(ErrorCode.UPDATE_USER_FAILED);
    }

    // 全量更新individualInfo字段
    user.individualInfo.fullName = dto.fullName;
    user.individualInfo.identificationNumber = dto.identificationNumber;
    user.individualInfo.phoneNumber = dto.phoneNumber;
    user.individualInfo.gender = dto.gender;
    user.individualInfo.dateOfBirth = dto.dateOfBirth;
    user.individualInfo.residentialAddress = dto.residentialAddress;

    try {
      await this.userRepository.save(user);
      this.logger.log(`个人信息更新成功：${user.email}`);
      return createSuccessResponse(null, 'USER_INDIVIDUAL_INFO_UPDATED');
    } catch (error) {
      this.logger.error('更新个人信息失败', error);
      return createErrorResponse(ErrorCode.UPDATE_USER_FAILED);
    }
  }

  async updateEnterpriseInfo(
    userId: number,
    dto: UpdateEnterpriseUserDto,
  ): Promise<ApiResponse<string>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['enterpriseInfo'],
    });

    if (!user) {
      this.logger.warn(`更新企业用户信息失败：用户不存在：${userId}`);
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    if (user.userType !== UserType.Enterprise) {
      this.logger.warn(
        `用户类型不匹配，无法更新企业信息：${user.email}, 类型：${user.userType}`,
      );
      return createErrorResponse(ErrorCode.UPDATE_USER_FAILED);
    }

    if (!user.enterpriseInfo) {
      // 如果没有enterpriseInfo记录，需要根据业务决定是创建还是报错
      // 假设必须存在:
      this.logger.warn(`用户无企业信息记录：${user.email}`);
      return createErrorResponse(ErrorCode.UPDATE_USER_FAILED);
    }

    // 全量更新enterpriseInfo字段
    user.enterpriseInfo.enterpriseName = dto.enterpriseName;
    user.enterpriseInfo.enterpriseDescription = dto.enterpriseDescription;
    user.enterpriseInfo.registrationNumber = dto.registrationNumber;
    user.enterpriseInfo.contactPersonName = dto.contactPersonName;
    user.enterpriseInfo.contactPersonTitle = dto.contactPersonTitle;
    user.enterpriseInfo.contactPhoneNumber = dto.contactPhoneNumber;
    user.enterpriseInfo.enterpriseAddress = dto.enterpriseAddress;
    user.enterpriseInfo.industryType = dto.industryType;
    user.enterpriseInfo.companySize = dto.companySize;

    try {
      await this.userRepository.save(user);
      this.logger.log(`企业信息更新成功：${user.email}`);
      return createSuccessResponse(null, 'USER_ENTERPRISE_INFO_UPDATED');
    } catch (error) {
      this.logger.error('更新企业信息失败', error);
      return createErrorResponse(ErrorCode.UPDATE_USER_FAILED);
    }
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
      return createSuccessResponse(null, 'AVATAR_UPDATED');
    } catch (error) {
      this.logger.error('更新头像失败', error);
      return createErrorResponse(ErrorCode.UPDATE_USER_AVATAR_FAILED);
    }
  }
}
