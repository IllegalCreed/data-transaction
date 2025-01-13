import { IndividualUserDetailData } from './individual-user-detail.interface';

// 返回值可选，所以所有属性都可选
export type IndividualUserItem = Omit<
  Partial<IndividualUserDetailData>,
  'avatarUrl'
>;
