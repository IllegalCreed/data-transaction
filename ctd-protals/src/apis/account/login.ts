import request from '@/axios'
import type { ILogin } from '@/types/login'

export const loginAPI = (login: ILogin): Promise<unknown> => {
  const data = {
    username: login.account,
    password: login.password,
  }
  return request.post(
    {
      url: '/login',
      data,
    },
    false,
  )
}

export const getCodeAPI = (): Promise<unknown> => {
  return request.get({ url: '/captchaImage' })
}

export const getAdAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '',
      params,
    },
    true,
  )
}
