import { EnterpriseUserDetailData } from './enterprise-user-detail.interface';

// 返回值可选，所以所有属性都可选
export type EnterpriseUserItem = Omit<
  Partial<EnterpriseUserDetailData>,
  | 'avatarUrl'
  | 'enterpriseDescription'
  | 'contactPersonTitle'
  | 'enterpriseAddress'
>;
