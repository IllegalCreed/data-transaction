import type { ActiveStatus } from '@/constants/mapData'
import type { LinkTypes } from '@/constants/mapData/banner'

interface IBannerBase {
  id: string | number
  title: string
  imageUrl: string
  linkType: LinkTypes
  status: ActiveStatus
  createdAt: string
  updatedAt: string
}

interface IBannerNone extends IBannerBase {
  linkType: LinkTypes.None
}

interface IBannerOuterLink extends IBannerBase {
  linkType: LinkTypes.OuterLink
  data: string
}

export interface IBannerWithId extends IBannerBase {
  linkType: LinkTypes.Scene | LinkTypes.Product | LinkTypes.Demand | LinkTypes.News
  data: { id: string | number }
}

export type IBanner = IBannerNone | IBannerOuterLink | IBannerWithId

export type IBannerItem = Omit<IBanner, 'imageUrl'>

type IBannerNoneDTO = Omit<IBannerNone, 'id' | 'createdAt' | 'updatedAt'>

type IBannerOuterLinkDTO = Omit<IBannerOuterLink, 'id' | 'createdAt' | 'updatedAt'>

type IBannerWithIdDTO = Omit<IBannerWithId, 'id' | 'createdAt' | 'updatedAt'>

export type IBannerDTO = IBannerNoneDTO | IBannerOuterLinkDTO | IBannerWithIdDTO
