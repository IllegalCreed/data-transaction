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
import { UserType } from 'src/enums/user-type.enum';
import { ExpectedError } from 'src/types/error';
import { USER_INDIVIDUAL_FIELD_MAP } from './config/field-map.config'; // 关键映射
import { IndividualUserItem } from './types/individual-user-item.type';
import { USER_ALIAS, INFO_ALIAS } from './config/alias.config';
import { FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { AbstractListService } from 'src/common/services/abstract-list.service';

@Injectable()
export class UserService extends AbstractListService<User, IndividualUserItem> {
  protected logger = new Logger(UserService.name);

  protected defaultOrderBy = `${USER_ALIAS}.id`;
  protected fuzzySearchMap = FUZZY_SEARCH_MAP;
  protected fieldMap = USER_INDIVIDUAL_FIELD_MAP;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(IndividualUserInfo)
    private readonly individualUserInfoRepository: Repository<IndividualUserInfo>,
  ) {
    super();
  }

  protected buildBaseQuery() {
    const qb = this.userRepository
      .createQueryBuilder(USER_ALIAS)
      .leftJoinAndSelect(`${USER_ALIAS}.individualInfo`, INFO_ALIAS)
      .where(`${USER_ALIAS}.userType = :type`, { type: UserType.Individual });
    return qb;
  }

  protected transformEntities(entities: User[]): IndividualUserItem[] {
    return entities.map((u) => {
      return {
        id: u.id,
        email: u.email,
        status: u.status,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        fullName: u.individualInfo?.fullName,
        identificationNumber: u.individualInfo?.identificationNumber,
        phoneNumber: u.individualInfo?.phoneNumber,
        gender: u.individualInfo?.gender,
        dateOfBirth: u.individualInfo?.dateOfBirth,
        residentialAddress: u.individualInfo?.residentialAddress,
      };
    });
  }

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
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取个人用户信息失败', error);
      return createErrorResponse(ErrorCode.GET_USER_FAILED);
    }
  }
}
