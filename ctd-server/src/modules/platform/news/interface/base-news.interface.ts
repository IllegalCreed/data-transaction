import { ActiveStatus } from 'src/enums/active-status.enum';

export interface BaseNews {
  id: number | string;
  title: string;
  author?: string;
  summary?: string;
  coverImageUrl?: string;
  headerImageUrl?: string;
  content: string;
  readCount: number;
  publishedAt: Date;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}
