import request from '@/axios'
import { registInfoConverter } from '@/apiConvert/account/register'
import type { RegistInfoType } from '@/types/register'

export const registerAPI = (registerInfo: RegistInfoType): Promise<unknown> => {
  const data = { ...registInfoConverter(registerInfo) }
  return request.post(
    {
      url: '/register/register',
      data,
    },
    false,
  )
}

export const activationAccountAPI = (token: string): Promise<unknown> => {
  const params = { token }

  return request.get(
    {
      url: '/register/activation',
      params,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    },
    false,
  )
}

export const tokenExchangeEmailAPI = (token: string): Promise<unknown> => {
  const params = { token }

  return request.get(
    {
      url: '/register/getEmail',
      params,
    },
    false,
  )
}

export const reSendActivationEmailAPI = (email: string): Promise<unknown> => {
  const params = { email }

  return request.get(
    {
      url: '/register/refreshActivation',
      params,
    },
    false,
  )
}

export const getRegisterAdsAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getRegisterAdsAPI',
      params,
    },
    false,
  )
}
