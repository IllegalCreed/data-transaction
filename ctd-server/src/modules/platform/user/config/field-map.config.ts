import type { IndividualUserItem } from '../types/individual-user-item.type';
import { USER_ALIAS, INFO_ALIAS } from './alias.config';

export const USER_INDIVIDUAL_FIELD_MAP: Record<
  keyof IndividualUserItem,
  string
> = {
  id: `${USER_ALIAS}.id`,
  email: `${USER_ALIAS}.email`,
  status: `${USER_ALIAS}.status`,
  createdAt: `${USER_ALIAS}.createdAt`,
  updatedAt: `${USER_ALIAS}.updatedAt`,

  fullName: `${INFO_ALIAS}.fullName`,
  identificationNumber: `${INFO_ALIAS}.identificationNumber`,
  phoneNumber: `${INFO_ALIAS}.phoneNumber`,
  gender: `${INFO_ALIAS}.gender`,
  dateOfBirth: `${INFO_ALIAS}.dateOfBirth`,
  residentialAddress: `${INFO_ALIAS}.residentialAddress`,
};
