import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { GetIndividualUsersDto } from './dto/get-individual-users.dto';
import { UserType } from 'src/enums/user-type.enum';
import { ExpectedError } from 'src/types/error';
import { USER_INDIVIDUAL_FIELD_MAP } from './config/field-map.config'; // 关键映射
import { IndividualUserItem } from './types/individual-user-item.type';
import { USER_ALIAS, INFO_ALIAS } from './config/alias.config';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(IndividualUserInfo)
    private readonly individualUserInfoRepository: Repository<IndividualUserInfo>,
  ) {}

  async getIndividualUsers(
    dto: GetIndividualUsersDto,
  ): Promise<ApiResponse<any>> {
    const { searchQuery, filters, sorts, columns, pageNum, pageSize } = dto;

    try {
      // 1) 构建查询
      const qb = this.userRepository
        .createQueryBuilder(USER_ALIAS)
        .leftJoinAndSelect(`${USER_ALIAS}.individualInfo`, INFO_ALIAS)
        .where(`${USER_ALIAS}.userType = :type`, { type: UserType.Individual });

      // 2) 搜索(在 email, fullName, identificationNumber, phoneNumber 上模糊搜索)
      if (searchQuery) {
        qb.andWhere(
          new Brackets((qb1) => {
            qb1
              .where(`${USER_ALIAS}.email LIKE :search`, {
                search: `%${searchQuery}%`,
              })
              .orWhere(`${INFO_ALIAS}.fullName LIKE :search`, {
                search: `%${searchQuery}%`,
              })
              .orWhere(`${INFO_ALIAS}.identificationNumber LIKE :search`, {
                search: `%${searchQuery}%`,
              })
              .orWhere(`${INFO_ALIAS}.phoneNumber LIKE :search`, {
                search: `%${searchQuery}%`,
              });
          }),
        );
      }

      // 3) 筛选 filters
      if (filters && filters.length > 0) {
        for (const f of filters) {
          // 通过 fieldMap 查找SQL字段
          const fieldSql = USER_INDIVIDUAL_FIELD_MAP[f.prop];
          if (!fieldSql) {
            this.logger.warn(`无效的筛选字段prop: ${f.prop}`);
            continue;
          }
          switch (f.type) {
            case 'input':
              // 当 f.value 是空串/undefined/null 时跳过
              if (typeof f.value === 'string' && f.value.trim().length > 0) {
                qb.andWhere(`${fieldSql} LIKE :val`, { val: `%${f.value}%` });
              }
              break;

            case 'enum':
              // 当 f.value 不是数组或数组为空 => 跳过
              if (Array.isArray(f.value) && f.value.length > 0) {
                qb.andWhere(`${fieldSql} IN (:...vals)`, { vals: f.value });
              }
              break;

            case 'date':
              // 当 f.value 不是 [start, end] => 跳过
              if (Array.isArray(f.value) && f.value.length === 2) {
                const [start, end] = f.value;
                qb.andWhere(`${fieldSql} BETWEEN :start AND :end`, {
                  start,
                  end,
                });
              }
              break;

            default:
              this.logger.warn(`未知的filter类型: ${f.type}`);
              break;
          }
        }
      }

      // 4) 多字段排序 sorts
      if (sorts && sorts.length > 0) {
        for (const s of sorts) {
          const fieldSql = USER_INDIVIDUAL_FIELD_MAP[s.prop];
          if (!fieldSql) {
            this.logger.warn(`无效的排序字段: ${s.prop}`);
            continue;
          }
          const order =
            s.order === 'desc' || s.order === 'asc'
              ? s.order.toUpperCase()
              : null;
          if (!order) {
            this.logger.warn(`排序字段 ${s.prop} 的order无效, 跳过`);
            continue;
          }
          qb.addOrderBy(fieldSql, order as 'ASC' | 'DESC');
        }
      } else {
        qb.addOrderBy('user.id', 'DESC'); // 默认排序
      }

      // 5) 分页
      qb.skip((pageNum - 1) * pageSize).take(pageSize);

      // 6) 执行查询
      const [rows, total] = await qb.getManyAndCount();

      // 7) 列可见性处理（强制返回id）
      const alwaysIncluded = ['id'];
      const visibleProps = new Set(alwaysIncluded);

      if (Array.isArray(columns)) {
        for (const col of columns) {
          const v = col.visible === undefined ? true : col.visible; // 如果未定义就true
          if (v) {
            visibleProps.add(col.prop.toString());
          }
        }
      }

      // 8) 构造返回
      const data = rows.map((user) => {
        // 先组装全部字段(后面可加/减字段)
        const item: IndividualUserItem = {
          id: user.id,
          email: user.email,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          fullName: user.individualInfo?.fullName,
          identificationNumber: user.individualInfo?.identificationNumber,
          phoneNumber: user.individualInfo?.phoneNumber,
          gender: user.individualInfo?.gender,
          dateOfBirth: user.individualInfo?.dateOfBirth,
          residentialAddress: user.individualInfo?.residentialAddress,
        };

        const filteredItem: Record<string, any> = {};
        for (const prop of visibleProps) {
          if (Object.prototype.hasOwnProperty.call(item, prop)) {
            filteredItem[prop] = item[prop];
          }
        }
        return filteredItem;
      });

      this.logger.log(`获取个人用户列表成功`);
      return createSuccessResponse(
        {
          rows: data,
          total,
          pageNum,
          pageSize,
        },
        'GET_INDIVIDUAL_USERS_SUCCEED',
      );
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }

      this.logger.error('获取个人用户列表失败', error);
      return createErrorResponse(ErrorCode.GET_USER_LIST_FAILED);
    }
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
