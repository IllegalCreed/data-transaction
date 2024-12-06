import request from '@/axios'
import { registInfoConverter } from '@/apiConvert/account/register'
import type { RegistrationInfo } from '@/types/register'

export const register = (registerInfo: RegistrationInfo): Promise<unknown> => {
  const data = { ...registInfoConverter(registerInfo) }
  return request.post(
    {
      url: '/register/register',
      data,
    },
    false,
  )
}

export const activateAccount = (token: string): Promise<unknown> => {
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

export const tokenExchangeEmail = (token: string): Promise<unknown> => {
  const params = { token }

  return request.get(
    {
      url: '/register/getEmail',
      params,
    },
    false,
  )
}

export const reSendActivationEmail = (email: string): Promise<unknown> => {
  const params = { email }

  return request.get(
    {
      url: '/register/refreshActivation',
      params,
    },
    false,
  )
}

export const getRegisterAds = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getRegisterAds',
      params,
    },
    false,
  )
}
