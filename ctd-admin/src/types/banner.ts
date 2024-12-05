import type { ActiveStatus } from '@/constants/mapData'
import type { LinkTypes } from '@/constants/mapData/banner'

export interface IBanner {
  id: string | number
  title: string
  imageUrl: string
  linkType: LinkTypes
  data?: object | string
  status: ActiveStatus
  createTime: string
  updateTime: string
}

export type IBannerItem = Omit<IBanner, 'imageUrl'>

export type IBannerDTO = Omit<IBanner, 'id' | 'createTime' | 'updateTime'>
