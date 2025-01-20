import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';
import { AbstractListService } from 'src/common/services/abstract-list.service'; // 引入基类
import { CompanyItem } from './interface/company-item.interface';
import { COMPANY_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { COMPANY_FIELD_MAP } from './config/field-map.config';
import { COMPANY_ALIAS } from './config/alias.config';
import { UpsertCompanyDto } from './dto/upsert-company.dto';

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

  /**
   * Upsert（插入或更新）公司信息
   * @param id 公司ID，若是新增则传入空值或负值
   * @param companyInfo 公司详细信息
   * @returns 返回更新后的公司对象
   */
  async upsertCompany(dto: UpsertCompanyDto): Promise<Company> {
    const { id, companyInfo } = dto;

    let company: Company;

    // 如果id是正整数，则执行更新
    if (id > 0) {
      company = await this.companyRepository.findOne({
        where: { id },
      });
      if (!company) {
        this.logger.warn(`更新失败：未找到公司 ID ${id}`);
        throw new Error('Company not found');
      }

      // 更新公司信息
      company.name = companyInfo.name;
      company.description = companyInfo.description;
      company.content = companyInfo.content;
      company.link = companyInfo.link;
      company.logoUrl = companyInfo.logoUrl;
      company.partnerType = companyInfo.partnerType;
      company.status = companyInfo.status;
      company.isShowInFooter = companyInfo.isShowInFooter;

      await this.companyRepository.save(company); // 保存更新
    } else {
      // 如果id无效，则执行插入操作
      company = this.companyRepository.create(companyInfo);
      await this.companyRepository.save(company); // 保存插入的新公司
    }

    return company;
  }
}
