import type { ActiveStatus } from '@/constants/mapData'
import type { PartnerTypes } from '@/constants/mapData/company'

export interface ICompanyOption {
  id: string | number
  name: string
}

export interface ICompany {
  id: string | number
  name: string
  description: string
  content?: string
  link: string
  logoUrl?: string
  partnerType: PartnerTypes
  isShowInFooter: boolean
  status: ActiveStatus
  createTime: string
  updateTime: string
}

export type ICompanyItem = Omit<ICompany, 'description' | 'content'>

export type ICompanyDTO = Omit<ICompany, 'id' | 'createTime' | 'updateTime'>
