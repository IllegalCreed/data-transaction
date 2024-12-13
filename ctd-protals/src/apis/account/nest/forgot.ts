import request from '@/axios'

export const resetPasswordByToken = (
  token: string,
  password: string,
): Promise<unknown> => {
  const data = { token, newPassword: password }
  return request.post(
    {
      url: '/forgot/reset-password',
      data,
    },
    false,
  )
}
