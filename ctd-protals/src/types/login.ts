export interface ILogin {
  account: string
  password: string
  code?: string
  uuid?: string
}

export interface ILoginCode {
  uuid: string
  img: string
}

export interface IAuthLink {
  icon: string
  url: string
}

export interface ILoginAd {
  title: string
  desc: string
  carousels: ILoginAdCarouselItem[]
}

export interface ILoginAdCarouselItem {
  id: string
  title: string
  name: string
  comment: string
  avatar: string
}
