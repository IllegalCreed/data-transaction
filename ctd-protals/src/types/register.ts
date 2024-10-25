// 基础注册信息接口
export interface IBaseInfo {
  email: string
  password: string
  confirmPassword: string
}

// 个人用户信息接口
export interface IIndividualUserInfo {
  fullName: string
  identificationNumber: string
  phoneNumber: string
  gender: string
  dateOfBirth: string
  residentialAddress: string
}

// 企业用户信息接口
export interface IEnterpriseInfo {
  enterpriseName: string
  enterpriseDescription: string
  registrationNumber: string
  contactPersonName: string
  contactPersonTitle: string
  contactPhoneNumber: string
  enterpriseAddress: string
  industryType: string
  numberOfEmployees: string
}

// 用户类型
export enum UserType {
  Individual = 'individual',
  Enterprise = 'enterprise',
}

// 自然语言映射
export const UserTypeLabels: Record<UserType, string> = {
  [UserType.Individual]: '个人用户',
  [UserType.Enterprise]: '企业用户',
}

// 注册信息类型
export type RegistrationInfo =
  | (IBaseInfo & IIndividualUserInfo & { userType: UserType.Individual })
  | (IBaseInfo & IEnterpriseInfo & { userType: UserType.Enterprise })
