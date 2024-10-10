export interface IScene {
  id: number
  title: string
  companyName: string
  description: string
  imageUrl: string
  link?: string
  content?: string
}

export interface ISolicit {
  content: string
  link: string
  companys: string[]
  undertakes: string[]
  email: string
  phone: string
}
