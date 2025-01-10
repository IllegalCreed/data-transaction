/**
 * 用于描述“个人用户详情”的数据结构，
 * 通常包含User表+IndividualInfo表融合后的必要字段
 */
export interface IIndividualUserDetailData {
  id: number;
  email: string;
  status: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  phoneNumber: string;
  identificationNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  residentialAddress?: string;
}
