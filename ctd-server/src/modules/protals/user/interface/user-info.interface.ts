import { CompanySize } from 'src/enums/company-size.enum';
import { GenderType } from 'src/enums/gender-type.enum';
import { IndustryType } from 'src/enums/industry-type.enum';
import { UserStatus } from 'src/enums/user-status.enum';
import { UserType } from 'src/enums/user-type.enum';

export interface IUserInfoData {
  email: string;
  userType: UserType;
  status: UserStatus;
  fullName?: string;
  phoneNumber?: string;
  identificationNumber?: string;
  gender?: GenderType;
  dateOfBirth?: string;
  residentialAddress?: string;
  enterpriseName?: string;
  enterpriseDescription?: string;
  registrationNumber?: string;
  contactPersonName?: string;
  contactPersonTitle?: string;
  contactPhoneNumber?: string;
  enterpriseAddress?: string;
  industryType?: IndustryType;
  companySize?: CompanySize;
}
