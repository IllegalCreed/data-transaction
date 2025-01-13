import { IndustryType } from 'src/enums/industry-type.enum';
import { BaseUserItem } from './base-user-item.interface';
import { CompanySize } from 'src/enums/company-size.enum';

export interface EnterpriseUserDetailData extends BaseUserItem {
  enterpriseName: string;
  enterpriseDescription?: string;
  registrationNumber: string;
  contactPersonName: string;
  contactPersonTitle?: string;
  contactPhoneNumber: string;
  enterpriseAddress: string;
  industryType: IndustryType;
  companySize?: CompanySize;
}
