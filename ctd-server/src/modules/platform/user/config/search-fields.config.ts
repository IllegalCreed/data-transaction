import { SubsetRecordOf } from 'src/types/common';
import { IndividualUserItem } from '../types/individual-user-item.type';
import { USER_ALIAS, INFO_ALIAS } from './alias.config';

/**
 * 这里定义“哪些字段需要做模糊搜索”以及对应的SQL实际字段名。
 */
export const FUZZY_SEARCH_MAP: SubsetRecordOf<IndividualUserItem> = {
  email: `${USER_ALIAS}.email`,
  fullName: `${INFO_ALIAS}.fullName`,
  identificationNumber: `${INFO_ALIAS}.identificationNumber`,
  phoneNumber: `${INFO_ALIAS}.phoneNumber`,
};
