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

export type RegistRoleType = 'personal' | 'enterprise' | undefined

export type RegistInfoType =
  | (IBaseInfo & IIndividualUserInfo & { userIdentity: 'personal' })
  | (IBaseInfo & IEnterpriseInfo & { userIdentity: 'enterprise' })
