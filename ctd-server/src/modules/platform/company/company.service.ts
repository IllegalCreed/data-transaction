import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';
import { AbstractListService } from 'src/common/services/abstract-list.service'; // 引入基类
import { CompanyItem } from './interface/company-item.interface';
import { COMPANY_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { COMPANY_FIELD_MAP } from './config/field-map.config';
import { COMPANY_ALIAS } from './config/alias.config';
import { UpsertCompanyDto } from './dto/upsert-company.dto';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ActiveStatus } from 'src/enums/active-status.enum';

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
    const { id, ...companyInfo } = dto;

    let company: Company;

    // 如果id是正整数，则执行更新
    if (id > 0) {
      company = await this.companyRepository.findOne({
        where: { id },
      });
      if (!company) {
        this.logger.warn(`公司信息保存失败：未找到公司 id=${id}`);
        throw new ExpectedError(ErrorCode.COMPANY_NOT_FOUND);
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

  /**
   * 获取公司详情
   * @param id 公司ID
   * @returns 公司详情
   */
  async getCompany(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      this.logger.warn(`获取公司详情失败: 未找到公司 id=${id}`);
      throw new ExpectedError(ErrorCode.COMPANY_NOT_FOUND);
    }

    // 返回公司详情
    const companyDetail: Company = {
      id: company.id,
      name: company.name,
      description: company.description,
      content: company.content,
      link: company.link,
      logoUrl: company.logoUrl,
      partnerType: company.partnerType,
      isShowInFooter: company.isShowInFooter,
      status: company.status,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };

    return companyDetail;
  }

  /**
   * 批量修改公司状态
   * @param ids 公司ID列表
   * @param status 目标状态
   */
  async changeStatus(
    ids: (string | number)[],
    status: ActiveStatus,
  ): Promise<void> {
    // 查找要更新的公司
    const companies = await this.companyRepository.find({
      where: { id: In(ids) },
    });

    if (!companies || companies.length === 0) {
      this.logger.warn(`修改公司状态失败: 未找到任何匹配的公司: [${ids}]`);
      throw new ExpectedError(ErrorCode.COMPANY_NOT_FOUND);
    }

    // 更新状态
    for (const company of companies) {
      company.status = status;
    }

    // 保存更新后的公司
    try {
      await this.companyRepository.save(companies);
    } catch (error) {
      this.logger.error('修改公司状态失败: 数据库保存失败', error);
      throw new ExpectedError(ErrorCode.UPDATE_COMPANY_STATUS_FAILED);
    }
  }

  /**
   * 批量删除公司（软删除）
   * @param ids 公司ID列表
   */
  async delete(ids: (string | number)[]): Promise<void> {
    // 查找要删除的公司
    const companies = await this.companyRepository.find({
      where: { id: In(ids) },
      withDeleted: false,
    });

    if (!companies || companies.length === 0) {
      this.logger.warn(`删除公司失败: 未找到任何匹配的公司: [${ids}]`);
      throw new ExpectedError(ErrorCode.COMPANY_NOT_FOUND);
    }

    // 软删除
    try {
      await this.companyRepository.softRemove(companies);
    } catch (error) {
      this.logger.error('删除公司失败: 数据库删除失败', error);
      throw new ExpectedError(ErrorCode.DELETE_COMPANY_FAILED);
    }
  }
}
