import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ErrorCode } from 'src/common/constants/error-codes';
import { UserType } from 'src/enums/user-type.enum';
import { ExpectedError } from 'src/types/error';
import { USER_ENTERPRISE_FIELD_MAP } from './config/field-map.config'; // 关键映射
import { USER_ALIAS, INFO_ALIAS } from './config/alias.config';
import { USER_ENTERPRISE_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { EnterpriseUserItem } from './interface/enterprise-user-item.interface';
import { EnterpriseUserInfo } from 'src/entities/enterprise-user-info.entity';
import { EnterpriseUserDetailData } from './interface/enterprise-user-detail.interface';

@Injectable()
export class EnterpriseService extends AbstractListService<
  User,
  EnterpriseUserItem
> {
  protected logger = new Logger(EnterpriseService.name);

  protected defaultOrderBy = `${USER_ALIAS}.id`;
  protected fuzzySearchMap = USER_ENTERPRISE_FUZZY_SEARCH_MAP;
  protected fieldMap = USER_ENTERPRISE_FIELD_MAP;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EnterpriseUserInfo)
    private readonly enterpriseUserInfoRepository: Repository<EnterpriseUserInfo>,
  ) {
    super();
  }

  protected buildBaseQuery() {
    const qb = this.userRepository
      .createQueryBuilder(USER_ALIAS)
      .leftJoinAndSelect(`${USER_ALIAS}.enterpriseInfo`, INFO_ALIAS)
      .where(`${USER_ALIAS}.userType = :type`, { type: UserType.Enterprise });
    return qb;
  }

  protected transformEntities(entities: User[]): EnterpriseUserItem[] {
    return entities.map((u) => {
      return {
        id: u.id,
        email: u.email,
        status: u.status,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        enterpriseName: u.enterpriseInfo?.enterpriseName,
        registrationNumber: u.enterpriseInfo?.registrationNumber,
        contactPersonName: u.enterpriseInfo?.contactPersonName,
        contactPhoneNumber: u.enterpriseInfo?.contactPhoneNumber,
        industryType: u.enterpriseInfo?.industryType,
        companySize: u.enterpriseInfo?.companySize,
      };
    });
  }

  async getEnterpriseUser(userId: number): Promise<EnterpriseUserDetailData> {
    // 1) 查询User + 关联的 EnterpriseUserInfo
    const user = await this.userRepository.findOne({
      where: { id: userId, userType: UserType.Enterprise },
      relations: ['enterpriseInfo'],
    });

    if (!user || !user.enterpriseInfo) {
      this.logger.warn(`用户用户信息不存在: userId=${userId}`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }

    // 2) 构造需要返回的数据(可根据前端需求组装)
    const data: EnterpriseUserDetailData = {
      id: user.id,
      email: user.email,
      avatarUrl: user.avatarUrl,
      status: user.status,
      enterpriseName: user.enterpriseInfo.enterpriseName,
      enterpriseDescription: user.enterpriseInfo.enterpriseDescription,
      registrationNumber: user.enterpriseInfo.registrationNumber,
      contactPersonName: user.enterpriseInfo.contactPersonName,
      contactPersonTitle: user.enterpriseInfo.contactPersonTitle,
      contactPhoneNumber: user.enterpriseInfo.contactPhoneNumber,
      enterpriseAddress: user.enterpriseInfo.enterpriseAddress,
      industryType: user.enterpriseInfo.industryType,
      companySize: user.enterpriseInfo.companySize,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return data;
  }
}
