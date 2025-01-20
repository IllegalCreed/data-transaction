import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';
import { AbstractListService } from 'src/common/services/abstract-list.service'; // 引入基类
import { CompanyItem } from './interface/company-item.interface';
import { COMPANY_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { COMPANY_FIELD_MAP } from './config/field-map.config';
import { COMPANY_ALIAS } from './config/alias.config';

@Injectable()
export class CompanyService extends AbstractListService<Company, CompanyItem> {
  protected logger = new Logger(CompanyService.name);

  protected defaultOrderBy = `${COMPANY_ALIAS}.id`;
  protected fuzzySearchMap = COMPANY_FUZZY_SEARCH_MAP;
  protected fieldMap = COMPANY_FIELD_MAP;

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    super();
  }

  protected buildBaseQuery() {
    const qb = this.companyRepository.createQueryBuilder('company');

    // 默认查询条件
    return qb;
  }

  protected transformEntities(entities: Company[]): CompanyItem[] {
    return entities.map((c) => {
      return {
        id: c.id,
        name: c.name,
        link: c.link,
        logoUrl: c.logoUrl,
        partnerType: c.partnerType,
        isShowInFooter: c.isShowInFooter,
        status: c.status,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      };
    });
  }
}
