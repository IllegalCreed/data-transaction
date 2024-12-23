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

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly fieldMap: Record<string, string> = {
    // User表字段
    id: 'user.id',
    email: 'user.email',
    status: 'user.status',
    createdAt: 'user.createdAt',
    updatedAt: 'user.updatedAt',
    // IndividualInfo表字段
    fullName: 'info.fullName',
    identificationNumber: 'info.identificationNumber',
    phoneNumber: 'info.phoneNumber',
    gender: 'info.gender',
    dateOfBirth: 'info.dateOfBirth',
    residentialAddress: 'info.residentialAddress',
  };

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
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.individualInfo', 'info')
        .where('user.userType = :type', { type: UserType.Individual });

      // 2) 搜索(在 email, fullName, identificationNumber, phoneNumber 上模糊搜索)
      if (searchQuery) {
        qb.andWhere(
          new Brackets((qb1) => {
            qb1
              .where('user.email LIKE :search', { search: `%${searchQuery}%` })
              .orWhere('info.fullName LIKE :search', {
                search: `%${searchQuery}%`,
              })
              .orWhere('info.identificationNumber LIKE :search', {
                search: `%${searchQuery}%`,
              })
              .orWhere('info.phoneNumber LIKE :search', {
                search: `%${searchQuery}%`,
              });
          }),
        );
      }

      // 3) 筛选 filters
      if (filters && filters.length > 0) {
        for (const f of filters) {
          // 通过 fieldMap 查找SQL字段
          const fieldSql = this.fieldMap[f.prop];
          if (fieldSql) {
            switch (f.type) {
              case 'input':
                // input => LIKE 查询
                qb.andWhere(`${fieldSql} LIKE :val`, { val: `%${f.value}%` });
                break;

              case 'enum':
                // enum => string[] => In([...]) 查询
                qb.andWhere(`${fieldSql} IN (:...vals)`, { vals: f.value });
                break;

              case 'date':
                // date => [start, end] => Between(start, end)
                {
                  const [start, end] = f.value;
                  qb.andWhere(`${fieldSql} BETWEEN :start AND :end`, {
                    start,
                    end,
                  });
                }
                break;
            }
          } else {
            this.logger.warn(`筛选字段无效：${f.prop}`);
          }
        }
      }

      // 4) 多字段排序 sorts
      if (sorts && sorts.length > 0) {
        for (const s of sorts) {
          const order = s.order === 'desc' ? 'DESC' : 'ASC';
          const fieldSql = this.fieldMap[s.prop];
          if (fieldSql) {
            qb.addOrderBy(fieldSql, order);
          } else {
            this.logger.warn(`排序字段无效：${s.prop}`);
          }
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
      if (columns && columns.length > 0) {
        columns.forEach((col) => {
          if (col.visible) {
            visibleProps.add(col.prop as string);
          }
        });
      }

      // 8) 构造返回
      const data = rows.map((user) => {
        // 先组装全部字段(后面可加/减字段)
        const item: any = {
          id: user.id,
          email: user.email,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          // individualInfo fields
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
