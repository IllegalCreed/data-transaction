import type { BannerType } from '@/constants/mapData/banner'

export interface IBanner {
  id: number | string
  imageUrl: string
  type: BannerType
  payload?: string
}

export interface IModule {
  id: number | string
  title: string
  description: string
  iconUrl: string
}

export interface IHomeAd {
  id: number | string
  title: string
  desc: string
}

export interface IPartner {
  id: number | string
  title: string
  description: string
  imageUrl: string
  link: string
}
