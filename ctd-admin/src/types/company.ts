import type { ActiveStatus } from '@/constants/mapData'
import type { PartnerTypes } from '@/constants/mapData/company'

export interface ICompanyOption {
  id: string | number
  name: string
}

/**
 * 公司
 */
export interface ICompany {
  id: string | number
  name: string
  description?: string
  content?: string
  link?: string
  logoUrl?: string
  partnerType: PartnerTypes
  isShowInFooter: boolean
  status: ActiveStatus
  createdAt: string
  updatedAt: string
}

/**
 * 公司列表项
 */
export type ICompanyItem = Omit<ICompany, 'description' | 'content'>

/**
 * 新增修改公司
 */
export type ICompanyDTO = Omit<ICompany, 'id' | 'createdAt' | 'updatedAt'>
