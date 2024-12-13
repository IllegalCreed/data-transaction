import type { IOption } from '@/types/common'

export enum UserType {
  Individual = 'individual',
  Enterprise = 'enterprise'
}

export enum UserStatus {
  Pending = 'pending',
  Active = 'active',
  Suspended = 'suspended'
}
export const USER_STATUS_MAP: Record<UserStatus, string> = {
  [UserStatus.Pending]: '未激活',
  [UserStatus.Active]: '正常',
  [UserStatus.Suspended]: '停用'
}
export const USER_STATUS_COLOR_MAP: Record<
  UserStatus,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [UserStatus.Pending]: 'warning',
  [UserStatus.Active]: 'success',
  [UserStatus.Suspended]: 'danger'
}
export const userStatusOptions: IOption[] = Object.values(UserStatus).map((value) => ({
  value,
  label: USER_STATUS_MAP[value]
}))

export enum GenderType {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
export const GENDER_STATUS_MAP: Record<GenderType, string> = {
  [GenderType.Male]: '男',
  [GenderType.Female]: '女',
  [GenderType.Other]: '其他'
}
export const GENDER_STATUS_COLOR_MAP: Record<
  GenderType,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [GenderType.Male]: 'info',
  [GenderType.Female]: 'info',
  [GenderType.Other]: 'info'
}
export const genderTypesOptions: IOption[] = Object.values(GenderType).map((value) => ({
  value,
  label: GENDER_STATUS_MAP[value]
}))

export enum IndustryType {
  Agriculture = 'agriculture',
  Mining = 'mining',
  Manufacturing = 'manufacturing',
  Utilities = 'utilities',
  Construction = 'construction',
  WholesaleRetail = 'wholesale_retail',
  Transportation = 'transportation',
  AccommodationCatering = 'accommodation_catering',
  InformationTechnology = 'information_technology',
  Finance = 'finance',
  RealEstate = 'real_estate',
  ProfessionalServices = 'professional_services',
  ScientificResearch = 'scientific_research',
  WaterConservancy = 'water_conservancy',
  ResidentServices = 'resident_services',
  Education = 'education',
  Healthcare = 'healthcare',
  CultureEntertainment = 'culture_entertainment',
  PublicManagement = 'public_management',
  InternationalOrganizations = 'international_organizations',
  Other = 'other'
}

export enum CompanySize {
  Micro = 'micro',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra_large'
}
