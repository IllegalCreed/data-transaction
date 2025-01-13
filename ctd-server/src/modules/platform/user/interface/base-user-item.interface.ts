export interface BaseUserItem {
  id: number;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
}
