export interface ILogin {
  account: string
  password: string
  code: string
  uuid: string
}

export interface ILoginCode {
  uuid: string
  img: string
}

export interface IAuthLink {
  icon: string
  url: string
}
