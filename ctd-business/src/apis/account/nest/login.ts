import request from '@/axios'
import type { ILogin } from '@/types/login'

export const login = (login: ILogin): Promise<unknown> => {
  const data = {
    username: login.account,
    password: login.password,
    code: login.code,
    uuid: login.uuid
  }
  return request.post(
    {
      url: '/login',
      data
    },
    false
  )
}

export const getCode = (): Promise<unknown> => {
  return request.get({ url: '/captchaImage' })
}

export const logout = (): Promise<unknown> => {
  return request.post({ url: '/logout' })
}
