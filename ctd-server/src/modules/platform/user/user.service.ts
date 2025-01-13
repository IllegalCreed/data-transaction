import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { ErrorCode } from 'src/common/constants/error-codes';
import { UserType } from 'src/enums/user-type.enum';
import { ExpectedError } from 'src/types/error';
import { USER_INDIVIDUAL_FIELD_MAP } from './config/field-map.config'; // 关键映射
import { IndividualUserItem } from './interface/individual-user-item.interface';
import { USER_ALIAS, INFO_ALIAS } from './config/alias.config';
import { FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { IIndividualUserDetailData } from './interface/individual-user-detail.interface';
import { UserStatus } from 'src/enums/user-status.enum';

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

  async getIndividualUser(userId: number): Promise<IIndividualUserDetailData> {
    // 1) 查询User + 关联的 IndividualUserInfo
    const user = await this.userRepository.findOne({
      where: { id: userId, userType: UserType.Individual },
      relations: ['individualInfo'],
    });

    if (!user || !user.individualInfo) {
      this.logger.warn(`个人用户信息不存在: userId=${userId}`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
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

    return data;
  }

  /**
   * 批量修改用户状态
   * @param ids 用户id列表
   * @param status 目标状态
   */
  async changeUserStatus(
    ids: (string | number)[],
    status: UserStatus,
  ): Promise<void> {
    // 1) 查询要更新的用户
    const users = await this.userRepository.find({
      where: { id: In(ids) },
    });

    if (!users || users.length === 0) {
      this.logger.warn(`修改用户状态失败: 未找到任何匹配的用户: [${ids}]`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }

    // 2) 更新用户的状态
    for (const user of users) {
      user.status = status;
    }

    // 3) 保存
    try {
      await this.userRepository.save(users);
    } catch (error) {
      this.logger.error('修改用户状态失败: 数据库保存失败', error);
      throw new ExpectedError(ErrorCode.UPDATE_USER_STATUS_FAILED);
    }
  }

  /**
   * 批量删除用户（软删除）
   * @param ids 用户 ID 数组
   */
  async deleteUser(ids: (string | number)[]): Promise<void> {
    // 1) 检查是否存在这些用户
    const users = await this.userRepository.find({
      where: { id: In(ids) },
      withDeleted: false, // 只查未软删除的
    });

    if (!users || users.length === 0) {
      this.logger.warn(`deleteUser: 未找到任何匹配的用户: [${ids}]`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }

    // 2) 软删除
    try {
      // 方式一：使用 repository.softRemove(users)
      await this.userRepository.softRemove(users);

      // 方式二：也可使用 softDelete:
      // await this.userRepository.softDelete({ id: In(ids) });
      // 具体看您是否需要在此读取 user 实体
    } catch (error) {
      this.logger.error('deleteUser: 软删除数据库失败', error);
      throw new ExpectedError(ErrorCode.DELETE_USER_FAILED);
    }
  }
}
