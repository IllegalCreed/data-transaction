import { GenderType } from 'src/enums/gender-type.enum';
import { BaseUserItem } from './base-user-item.interface';

export interface IndividualUserDetailData extends BaseUserItem {
  fullName: string;
  identificationNumber?: string;
  phoneNumber: string;
  gender?: GenderType;
  dateOfBirth?: string;
  residentialAddress?: string;
}
