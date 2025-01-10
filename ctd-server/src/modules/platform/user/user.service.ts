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
import { IndividualUserItem } from './interface/individual-user-item.interface';
import { USER_ALIAS, INFO_ALIAS } from './config/alias.config';
import { FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { IIndividualUserDetailData } from './interface/individual-user-detail.interface';

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

  async getIndividualUser(
    userId: number,
  ): Promise<ApiResponse<IIndividualUserDetailData>> {
    try {
      // 1) 查询User + 关联的 IndividualUserInfo
      const user = await this.userRepository.findOne({
        where: { id: userId, userType: UserType.Individual },
        relations: ['individualInfo'],
      });

      if (!user || !user.individualInfo) {
        this.logger.warn(`个人用户信息不存在: userId=${userId}`);
        return createErrorResponse(ErrorCode.USER_NOT_FOUND);
      }

      // 2) 构造需要返回的数据(可根据前端需求组装)
      const data: IIndividualUserDetailData = {
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        status: user.status,
        fullName: user.individualInfo.fullName,
        phoneNumber: user.individualInfo.phoneNumber,
        identificationNumber: user.individualInfo.identificationNumber,
        gender: user.individualInfo.gender,
        dateOfBirth: user.individualInfo.dateOfBirth,
        residentialAddress: user.individualInfo.residentialAddress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      this.logger.log(`个人用户信息获取成功: userId=${userId}`);
      return createSuccessResponse(data, 'GET_INDIVIDUAL_USER_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('获取个人用户信息失败', error);
      return createErrorResponse(ErrorCode.GET_USER_FAILED);
    }
  }
}
