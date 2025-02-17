import { ActiveStatus } from 'src/enums/active-status.enum';
import { LinkTypes } from 'src/enums/link-type.enum';

export interface BannerBase {
  id: string | number;
  title: string;
  imageUrl: string;
  linkType: LinkTypes;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}
