import request from '@/axios'

export const sendVerificationCode = (email: string): Promise<unknown> => {
  const data = { email }
  return request.post(
    {
      url: '/register/forgotPwdSendEmail',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}

export const verifyCode = (email: string, code: string): Promise<unknown> => {
  const data = { email, code }
  return request.post(
    {
      url: '/register/forgotPwdVerifyEmailCode',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}

export const resetPasswordByToken = (
  token: string,
  password: string,
): Promise<unknown> => {
  const data = { code: token, password }
  return request.post(
    {
      url: '/register/forgotPwdReset',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}

export const getForgotAds = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getForgotAds',
      params,
    },
    true,
  )
}
