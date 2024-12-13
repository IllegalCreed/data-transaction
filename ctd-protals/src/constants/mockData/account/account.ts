import type { ISecurityInfo, UserInfo } from '@/types/account'
import {
  CompanySizeType,
  GenderType,
  IndustryType,
  UserType,
} from '@/types/register'

export const individualUserInfo: UserInfo = {
  userName: 'test@test.com',
  email: 'test@test.com',
  avatarUrl: new URL('@/assets/icon/user.png', import.meta.url).href,
  fullName: '爱旅游的小张',
  userType: UserType.Individual,
  identificationNumber: '123456789012345678',
  phoneNumber: '12345678901',
  dateOfBirth: '1990-01-01',
  gender: GenderType.Male,
  residentialAddress: '北京',
}

export const enterpriseUserInfo: UserInfo = {
  userName: 'test@test.com',
  email: 'test@test.com',
  avatarUrl: new URL('@/assets/icon/user.png', import.meta.url).href,
  enterpriseName: '文旅数据公司',
  userType: UserType.Enterprise,
  registrationNumber: '123456789012345678',
  contactPersonName: '小张',
  contactPhoneNumber: '12345678901',
  contactPersonTitle: '总经理',
  industryType: IndustryType.InformationTechnology,
  companySize: CompanySizeType.Medium,
  enterpriseAddress: '北京',
  enterpriseDescription: '这是一个测试企业',
}

export const securityInfo: ISecurityInfo = {
  lastLoginDate: '2024-09-18',
  lastLoginDevice: 'iPhone 12',
  lastLoginLocation: '北京, 中国',
}
