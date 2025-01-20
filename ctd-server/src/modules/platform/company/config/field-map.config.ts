import { CompanyItem } from '../interface/company-item.interface';
import { COMPANY_ALIAS } from './alias.config';

export const COMPANY_FIELD_MAP: Record<keyof CompanyItem, string> = {
  id: `${COMPANY_ALIAS}.id`,
  name: `${COMPANY_ALIAS}.name`,
  link: `${COMPANY_ALIAS}.link`,
  logoUrl: `${COMPANY_ALIAS}.logoUrl`,
  partnerType: `${COMPANY_ALIAS}.partnerType`,
  isShowInFooter: `${COMPANY_ALIAS}.isShowInFooter`,
  status: `${COMPANY_ALIAS}.status`,
  createdAt: `${COMPANY_ALIAS}.createdAt`,
  updatedAt: `${COMPANY_ALIAS}.updatedAt`,
};
