import type { ActiveStatus } from '@/constants/mapData'
import type { LinkTypes } from '@/constants/mapData/banner'

interface IBannerBase {
  id: string | number
  title: string
  imageUrl: string
  linkType: LinkTypes
  status: ActiveStatus
  createTime: string
  updateTime: string
}

interface IBannerNone extends IBannerBase {
  linkType: LinkTypes.None
}

interface IBannerOuterLink extends IBannerBase {
  linkType: LinkTypes.OuterLink
  data: string
}

export interface IBannerWithId extends IBannerBase {
  linkType: LinkTypes.Scene | LinkTypes.Product | LinkTypes.Demand
  data: { id: string | number }
}

export type IBanner = IBannerNone | IBannerOuterLink | IBannerWithId

export type IBannerItem = Omit<IBanner, 'imageUrl'>

type IBannerNoneDTO = Omit<IBannerNone, 'id' | 'createTime' | 'updateTime'>

type IBannerOuterLinkDTO = Omit<IBannerOuterLink, 'id' | 'createTime' | 'updateTime'>

type IBannerWithIdDTO = Omit<IBannerWithId, 'id' | 'createTime' | 'updateTime'>

export type IBannerDTO = IBannerNoneDTO | IBannerOuterLinkDTO | IBannerWithIdDTO
