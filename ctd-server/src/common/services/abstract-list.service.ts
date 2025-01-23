import { Brackets, SelectQueryBuilder } from 'typeorm';
import { GetListDto } from '../dto/get-list.dto';
import { Logger } from '@nestjs/common';

// 定义抽象类
export abstract class AbstractListService<Entity, ReturnType> {
  protected abstract logger: Logger;
  protected abstract defaultOrderBy: string;
  protected abstract fuzzySearchMap: Record<string, string>;
  protected abstract fieldMap: Record<string, string>;

  // 子类负责提供 QueryBuilder
  protected abstract buildBaseQuery(): SelectQueryBuilder<Entity>;

  /**
   * 处理“模糊搜索”
   */
  protected handleSearch(qb: SelectQueryBuilder<Entity>, searchQuery: string) {
    if (!searchQuery) return;
    qb.andWhere(
      new Brackets((qb1) => {
        // 初始化
        qb1.where('1=0');
        for (const prop in this.fuzzySearchMap) {
          const fieldSql = this.fuzzySearchMap[prop];
          qb1.orWhere(`${fieldSql} LIKE :search`, {
            search: `%${searchQuery}%`,
          });
        }
      }),
    );
  }

  /**
   * 筛选
   */
  protected handleFilters(qb: SelectQueryBuilder<Entity>, filters?: any[]) {
    if (!filters || filters.length === 0) return;
    for (const f of filters) {
      const fieldSql = this.fieldMap[f.prop];
      if (!fieldSql) {
        this.logger.warn(`无效的筛选字段: ${f.prop}`);
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
            if (start && end) {
              qb.andWhere(`${fieldSql} BETWEEN :start AND :end`, {
                start,
                end,
              });
            } else if (start) {
              qb.andWhere(`${fieldSql} >= :start`, { start });
            } else if (end) {
              qb.andWhere(`${fieldSql} <= :end`, { end });
            }
          }
          break;

        case 'boolean':
          if (typeof f.value === 'boolean') {
            qb.andWhere(`${fieldSql} = :val`, { val: f.value });
          }
          break;

        case 'number':
          if (Array.isArray(f.value)) {
            const [min, max] = f.value;
            if (min !== null && max !== null) {
              qb.andWhere(`${fieldSql} BETWEEN :min AND :max`, { min, max });
            } else if (min !== null) {
              qb.andWhere(`${fieldSql} >= :min`, { min });
            } else if (max !== null) {
              qb.andWhere(`${fieldSql} <= :max`, { max });
            }
          }
          break;

        default:
          this.logger.warn(`无效的筛选类型: ${f.type}`);
          break;
      }
    }
  }

  /**
   * 排序
   */
  protected handleSorts(qb: SelectQueryBuilder<Entity>, sorts?: any[]) {
    if (!sorts || sorts.length === 0) {
      qb.addOrderBy(this.defaultOrderBy, 'DESC');
      return;
    }
    let hasValidSort = false;
    for (const s of sorts) {
      const fieldSql = this.fieldMap[s.prop];
      if (!fieldSql) {
        this.logger.warn(`无效的排序字段: ${s.prop}`);
        continue;
      }
      const order =
        s.order === 'desc' ? 'DESC' : s.order === 'asc' ? 'ASC' : null;
      if (!order) {
        this.logger.warn(`无效的排序类型: ${s.order}`);
        continue;
      }
      qb.addOrderBy(fieldSql, order);
      hasValidSort = true;
    }
    if (!hasValidSort) {
      qb.addOrderBy(this.defaultOrderBy, 'DESC');
    }
  }

  /**
   * 处理分页
   */
  protected handlePaging(
    qb: SelectQueryBuilder<Entity>,
    pageNum: number,
    pageSize: number,
  ) {
    qb.skip((pageNum - 1) * pageSize).take(pageSize);
  }

  /**
   * 处理“列可见性” + “id强制保留”
   */
  protected handleColumns(
    records: ReturnType[],
    columns?: any[],
  ): ReturnType[] {
    const alwaysIncluded = ['id'];
    const visibleProps = new Set(alwaysIncluded);
    if (Array.isArray(columns)) {
      for (const col of columns) {
        const v = col.visible === undefined ? true : col.visible;
        if (v) {
          visibleProps.add(col.prop);
        }
      }
    }
    // 过滤
    return records.map((item) => {
      const filtered = {} as ReturnType;
      for (const prop of visibleProps) {
        if (Object.prototype.hasOwnProperty.call(item, prop)) {
          filtered[prop] = item[prop];
        }
      }
      return filtered;
    });
  }

  /**
   * 主流程: 构建Qb => 执行 => 构造返回
   */
  async getList(dto: GetListDto): Promise<{
    records: ReturnType[];
    total: number;
    pageNum: number;
    pageSize: number;
  }> {
    // 1) build Query
    const qb = this.buildBaseQuery();

    // 2) handle search
    this.handleSearch(qb, dto.searchQuery);

    // 3) handle filters
    this.handleFilters(qb, dto.filters);

    // 4) handle sorts
    this.handleSorts(qb, dto.sorts);

    // 5) paging
    this.handlePaging(qb, dto.pageNum, dto.pageSize);

    // 6) get data
    const [entities, total] = await qb.getManyAndCount();

    // 7) transform entities => ReturnType
    //   这里留给子类去实现“实体 => ReturnType”映射
    const items = this.transformEntities(entities);

    // 8) handle columns
    const finalItems = this.handleColumns(items, dto.columns);

    return {
      records: finalItems,
      total,
      pageNum: dto.pageNum,
      pageSize: dto.pageSize,
    };
  }

  /**
   * 让子类去实现“实体 => ReturnType” 的转换逻辑
   */
  protected abstract transformEntities(entities: Entity[]): ReturnType[];
}
