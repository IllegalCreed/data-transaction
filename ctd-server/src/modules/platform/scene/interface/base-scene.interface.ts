import { ActiveStatus } from 'src/enums/active-status.enum';

export interface BaseScene {
  id: number;
  title: string;
  summary?: string;
  companyName?: string;
  coverImageUrl?: string;
  headerImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: ActiveStatus;
  readCount: number;
  isOuterLink: boolean;
  content?: string;
  link?: string;
}
