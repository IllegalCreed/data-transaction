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
  gender?: string
  dateOfBirth?: string
  residentialAddress?: string
}

// 企业用户信息接口
export interface IEnterpriseInfo {
  enterpriseName: string
  enterpriseDescription?: string
  registrationNumber: string
  contactPersonName: string
  contactPersonTitle?: string
  contactPhoneNumber: string
  enterpriseAddress: string
  industryType: IndustryType
  companySize?: CompanySize
}

// 注册信息类型
export type RegistrationInfo =
  | (IBaseInfo & IIndividualUserInfo & { userType: UserType.Individual })
  | (IBaseInfo & IEnterpriseInfo & { userType: UserType.Enterprise })

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

// 行业类型枚举
export enum IndustryType {
  Agriculture = 'agriculture', // 农、林、牧、渔业
  Mining = 'mining', // 采矿业
  Manufacturing = 'manufacturing', // 制造业
  Utilities = 'utilities', // 电力、热力、燃气及水生产和供应业
  Construction = 'construction', // 建筑业
  WholesaleRetail = 'wholesale_retail', // 批发和零售业
  Transportation = 'transportation', // 交通运输、仓储和邮政业
  AccommodationCatering = 'accommodation_catering', // 住宿和餐饮业
  InformationTechnology = 'information_technology', // 信息传输、软件和信息技术服务业
  Finance = 'finance', // 金融业
  RealEstate = 'real_estate', // 房地产业
  ProfessionalServices = 'professional_services', // 租赁和商务服务业
  ScientificResearch = 'scientific_research', // 科学研究和技术服务业
  WaterConservancy = 'water_conservancy', // 水利、环境和公共设施管理业
  ResidentServices = 'resident_services', // 居民服务、修理和其他服务业
  Education = 'education', // 教育
  Healthcare = 'healthcare', // 卫生和社会工作
  CultureEntertainment = 'culture_entertainment', // 文化、体育和娱乐业
  PublicManagement = 'public_management', // 公共管理、社会保障和社会组织
  InternationalOrganizations = 'international_organizations', // 国际组织
  Other = 'other', // 其他
}

// 行业类型的自然语言映射
export const IndustryTypeLabels: Record<IndustryType, string> = {
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
  [IndustryType.Other]: '其他',
}

// 企业规模枚举
export enum CompanySize {
  Micro = 'micro', // 微型企业
  Small = 'small', // 小型企业
  Medium = 'medium', // 中型企业
  Large = 'large', // 大型企业
  ExtraLarge = 'extra_large', // 超大型企业
}

// 企业规模的自然语言映射
export const CompanySizeLabels: Record<CompanySize, string> = {
  [CompanySize.Micro]: '微型企业（1-9人）',
  [CompanySize.Small]: '小型企业（10-49人）',
  [CompanySize.Medium]: '中型企业（50-249人）',
  [CompanySize.Large]: '大型企业（250-999人）',
  [CompanySize.ExtraLarge]: '超大型企业（1000人以上）',
}
