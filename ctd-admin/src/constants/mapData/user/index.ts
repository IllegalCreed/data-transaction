import type { IOption, IPropLabelMap } from '@/types/common'
import type { IEnterpriseUserItem, IIndividualUserItem } from '@/types/user'

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
export const GENDER_TYPES_MAP: Record<GenderType, string> = {
  [GenderType.Male]: '男',
  [GenderType.Female]: '女',
  [GenderType.Other]: '其他'
}
export const GENDER_TYPES_COLOR_MAP: Record<
  GenderType,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [GenderType.Male]: 'info',
  [GenderType.Female]: 'info',
  [GenderType.Other]: 'info'
}
export const genderTypesOptions: IOption[] = Object.values(GenderType).map((value) => ({
  value,
  label: GENDER_TYPES_MAP[value]
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
export const INDUSTRY_TYPE_MAP: Record<IndustryType, string> = {
  [IndustryType.Agriculture]: '农、林、牧、渔业',
  [IndustryType.Mining]: '采矿业',
  [IndustryType.Manufacturing]: '制造业',
  [IndustryType.Utilities]: '电力、热力、燃气及水生产和供应业',
  [IndustryType.Construction]: '建筑业',
  [IndustryType.WholesaleRetail]: '批发和零售业',
  [IndustryType.Transportation]: '交通运输、仓储和邮政业',
  [IndustryType.AccommodationCatering]: '住宿和餐饮业',
  [IndustryType.InformationTechnology]: '信息传输、软件和信息技术服务业',
  [IndustryType.Finance]: '金融业',
  [IndustryType.RealEstate]: '房地产业',
  [IndustryType.ProfessionalServices]: '租赁和商务服务业',
  [IndustryType.ScientificResearch]: '科学研究和技术服务业',
  [IndustryType.WaterConservancy]: '水利、环境和公共设施管理业',
  [IndustryType.ResidentServices]: '居民服务、修理和其他服务业',
  [IndustryType.Education]: '教育',
  [IndustryType.Healthcare]: '卫生和社会工作',
  [IndustryType.CultureEntertainment]: '文化、体育和娱乐业',
  [IndustryType.PublicManagement]: '公共管理、社会保障和社会组织',
  [IndustryType.InternationalOrganizations]: '国际组织',
  [IndustryType.Other]: '其他'
}
export const INDUSTRY_TYPE_COLOR_MAP: Record<
  IndustryType,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [IndustryType.Agriculture]: 'info',
  [IndustryType.Mining]: 'info',
  [IndustryType.Manufacturing]: 'info',
  [IndustryType.Utilities]: 'info',
  [IndustryType.Construction]: 'info',
  [IndustryType.WholesaleRetail]: 'info',
  [IndustryType.Transportation]: 'info',
  [IndustryType.AccommodationCatering]: 'info',
  [IndustryType.InformationTechnology]: 'info',
  [IndustryType.Finance]: 'info',
  [IndustryType.RealEstate]: 'info',
  [IndustryType.ProfessionalServices]: 'info',
  [IndustryType.ScientificResearch]: 'info',
  [IndustryType.WaterConservancy]: 'info',
  [IndustryType.ResidentServices]: 'info',
  [IndustryType.Education]: 'info',
  [IndustryType.Healthcare]: 'info',
  [IndustryType.CultureEntertainment]: 'info',
  [IndustryType.PublicManagement]: 'info',
  [IndustryType.InternationalOrganizations]: 'info',
  [IndustryType.Other]: 'info'
}
export const industryTypesOptions: IOption[] = Object.values(IndustryType).map((value) => ({
  value,
  label: INDUSTRY_TYPE_MAP[value]
}))

export enum CompanySizeType {
  Micro = 'micro',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra_large'
}
export const COMPANY_SIZE_TYPE_MAP: Record<CompanySizeType, string> = {
  [CompanySizeType.Micro]: '微型企业（1-9人）',
  [CompanySizeType.Small]: '小型企业（10-49人）',
  [CompanySizeType.Medium]: '中型企业（50-249人）',
  [CompanySizeType.Large]: '大型企业（250-999人）',
  [CompanySizeType.ExtraLarge]: '超大型企业（1000人以上）'
}
export const COMPANY_SIZE_TYPE_COLOR_MAP: Record<
  CompanySizeType,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [CompanySizeType.Micro]: 'info',
  [CompanySizeType.Small]: 'info',
  [CompanySizeType.Medium]: 'info',
  [CompanySizeType.Large]: 'info',
  [CompanySizeType.ExtraLarge]: 'info'
}
export const companySizeTypesOptions: IOption[] = Object.values(CompanySizeType).map((value) => ({
  value,
  label: COMPANY_SIZE_TYPE_MAP[value]
}))

export const INDIVIDUAL_USER_PROP_LABEL_MAP: IPropLabelMap<IIndividualUserItem> = {
  id: 'ID',
  userType: '用户类型',
  email: '邮件',
  fullName: '姓名',
  identificationNumber: '身份证号',
  phoneNumber: '手机号',
  gender: '性别',
  status: '状态',
  createTime: '创建时间',
  updateTime: '更新时间'
}

export const ENTERPRISE_USER_PROP_LABEL_MAP: IPropLabelMap<IEnterpriseUserItem> = {
  id: 'ID',
  userType: '用户类型',
  email: '邮件',
  enterpriseName: '企业名称',
  registrationNumber: '统一社会信用代码',
  contactPersonName: '联系人姓名',
  contactPhoneNumber: '联系人电话',
  industryType: '行业类别',
  companySize: '企业规模',
  status: '状态',
  createTime: '创建时间',
  updateTime: '更新时间'
}
