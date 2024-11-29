import request from '@/axios'

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
