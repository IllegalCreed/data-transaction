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
