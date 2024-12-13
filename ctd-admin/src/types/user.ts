import type {
  CompanySizeType,
  GenderType,
  IndustryType,
  UserStatus
} from '@/constants/mapData/user'
import type { UserType } from '@/constants/mapData/user'

export interface IUserBase {
  id: string | number
  email: string
  avatarUrl?: string
  userType: UserType
  status: UserStatus
  createTime: string
  updateTime: string
}

export interface IIndividualUser extends IUserBase {
  fullName: string
  identificationNumber: string
  phoneNumber: string
  gender: GenderType
  dateOfBirth: string
  residentialAddress: string
}

export interface IEnterpriseUser extends IUserBase {
  enterpriseName: string
  enterpriseDescription: string
  registrationNumber: string
  contactPersonName: string
  contactPersonTitle: string
  contactPhoneNumber: string
  enterpriseAddress: string
  industryType: IndustryType
  companySize: CompanySizeType
}

export type IIndividualUserItem = Omit<
  IIndividualUser,
  'avatarUrl' | 'dateOfBirth' | 'residentialAddress'
>

export type IEnterpriseUserItem = Omit<
  IEnterpriseUser,
  'avatarUrl' | 'enterpriseDescription' | 'contactPersonTitle' | 'enterpriseAddress'
>
