import { BaseCompany } from './base-company.interface';

export type CompanyDetail = Omit<
  BaseCompany,
  'id' | 'createTime' | 'updateTime'
>;
