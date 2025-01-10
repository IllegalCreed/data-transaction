export interface ILogin {
  username: string
  password: string
  captchaId?: string
  captchaCode?: string
}

export interface ICaptcha {
  id: string
  data: string
}
