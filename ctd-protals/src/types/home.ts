export interface IBanner {
  id: number
  imageUrl: string
  route?: string
}

export interface IModule {
  id: number
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

export interface ILink {}
