export interface ILink {
  id: number
  title: string
  link: string
}

export interface IContact {
  address: string
  email: string
  phone: string
  wechatUrl: string
}

export interface IMenu {
  path: string
  label: string
  icon: string
  children?: IMenu[]
}
