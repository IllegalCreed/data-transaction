import { ActiveStatus } from 'src/enums/active-status.enum';
import { PartnerTypes } from 'src/enums/partner-types.enum';

export interface BaseCompany {
  id: string | number;
  name: string;
  description: string;
  content?: string;
  link: string;
  logoUrl?: string;
  partnerType: PartnerTypes;
  isShowInFooter: boolean;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}
