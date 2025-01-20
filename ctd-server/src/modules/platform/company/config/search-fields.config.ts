import { SubsetRecordOf } from 'src/types/common';
import { COMPANY_ALIAS } from './alias.config';
import { CompanyItem } from '../interface/company-item.interface';

/**
 * 这里定义“哪些字段需要做模糊搜索”以及对应的SQL实际字段名。
 */
export const COMPANY_FUZZY_SEARCH_MAP: SubsetRecordOf<CompanyItem> = {
  name: `${COMPANY_ALIAS}.name`,
  link: `${COMPANY_ALIAS}.link`,
};
