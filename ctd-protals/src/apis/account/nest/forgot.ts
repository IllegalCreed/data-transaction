import request from '@/axios'

export const resetPasswordByToken = (
  token: string,
  password: string,
): Promise<unknown> => {
  const data = { code: token, password }
  return request.post(
    {
      url: '/register/reset-password',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}
