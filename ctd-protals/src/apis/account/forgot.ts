import request from '@/axios'

export const forgotSendEmailAPI = (email: string): Promise<unknown> => {
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

export const forgotVerifyCodeAPI = (
  email: string,
  code: string,
): Promise<unknown> => {
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

export const forgotResetPasswordAPI = (
  code: string,
  password: string,
): Promise<unknown> => {
  const data = { code, password }
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

export const getForgotAdsAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getForgotAdsAPI',
      params,
    },
    true,
  )
}
