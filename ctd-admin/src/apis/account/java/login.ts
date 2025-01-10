import request from '@/axios'
import type { ILogin } from '@/types/login'

export const login = (login: ILogin): Promise<unknown> => {
  const data = {
    username: login.username,
    password: login.password,
    code: login.captchaCode,
    uuid: login.captchaId
  }
  return request.post(
    {
      url: '/login',
      data
    },
    false
  )
}

export const logout = (): Promise<unknown> => {
  return request.post({ url: '/logout' })
}
