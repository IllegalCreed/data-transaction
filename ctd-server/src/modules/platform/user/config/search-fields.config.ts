import { SubsetRecordOf } from 'src/types/common';
import { IndividualUserItem } from '../interface/individual-user-item.interface';
import { USER_ALIAS, INFO_ALIAS } from './alias.config';
import { EnterpriseUserItem } from '../interface/enterprise-user-item.interface';

/**
 * 这里定义“哪些字段需要做模糊搜索”以及对应的SQL实际字段名。
 */
export const USER_INDIVIDUAL_FUZZY_SEARCH_MAP: SubsetRecordOf<IndividualUserItem> =
  {
    email: `${USER_ALIAS}.email`,
    fullName: `${INFO_ALIAS}.fullName`,
    identificationNumber: `${INFO_ALIAS}.identificationNumber`,
    phoneNumber: `${INFO_ALIAS}.phoneNumber`,
  };

export const USER_ENTERPRISE_FUZZY_SEARCH_MAP: SubsetRecordOf<EnterpriseUserItem> =
  {
    email: `${USER_ALIAS}.email`,
    enterpriseName: `${INFO_ALIAS}.enterpriseName`,
    registrationNumber: `${INFO_ALIAS}.registrationNumber`,
    contactPersonName: `${INFO_ALIAS}.contactPersonName`,
    contactPhoneNumber: `${INFO_ALIAS}.contactPhoneNumber`,
  };
