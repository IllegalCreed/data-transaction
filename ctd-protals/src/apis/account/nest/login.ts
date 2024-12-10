import request from '@/axios'
import type { ILogin } from '@/types/login'

export const login = (login: ILogin): Promise<unknown> => {
  const data = {
    ...login,
  }
  return request.post(
    {
      url: '/login',
      data,
    },
    false,
  )
}

export const checkCaptcha = (email: string): Promise<unknown> => {
  const data = {
    email,
  }
  return request.post(
    {
      url: '/login/check-captcha',
      data,
    },
    false,
  )
}

export const getLoginAds = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '',
      params,
    },
    false,
  )
}
