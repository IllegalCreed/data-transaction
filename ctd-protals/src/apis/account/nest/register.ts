import request from '@/axios'
import type { RegistrationInfo } from '@/types/register'

export const register = (registerInfo: RegistrationInfo): Promise<unknown> => {
  const data = { ...registerInfo }
  return request.post(
    {
      url: '/register',
      data,
    },
    false,
  )
}

export const activateAccount = (token: string): Promise<unknown> => {
  const data = { activationToken: token }

  return request.post(
    {
      url: '/register/activate',
      data,
    },
    false,
  )
}

export const reSendActivationEmail = (email: string): Promise<unknown> => {
  const data = { email }

  return request.post(
    {
      url: '/register/resend-activation-email',
      data,
    },
    false,
  )
}
