import type { IEnterpriseInfo, IIndividualUserInfo, UserType } from './register'

export interface IUserBaseInfo {
  userName: string
  email: string
  avatar: string
}

export type UserInfo =
  | (IUserBaseInfo & IIndividualUserInfo & { userType: UserType.Individual })
  | (IUserBaseInfo & IEnterpriseInfo & { userType: UserType.Enterprise })

export interface ISecurityInfo {
  lastLoginDate: string
  lastLoginDevice: string
  lastLoginLocation: string
}
