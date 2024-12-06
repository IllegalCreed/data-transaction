export interface ILogin {
  email: string
  password: string
  captchaCode?: string
  captchaId?: string
}

export interface ICaptcha {
  id: string
  data: string
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
