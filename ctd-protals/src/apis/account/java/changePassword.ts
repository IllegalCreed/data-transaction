import request from '@/axios'

export const verifyPassword = (
  currentPassword: string,
  token: string,
): Promise<unknown> => {
  const data = { currentPassword, token }
  return request.post(
    {
      url: '/change-password/verify-password',
      data,
    },
    false,
  )
}

export const changePassword = (
  newPassword: string,
  token: string,
): Promise<unknown> => {
  const data = { newPassword, token }
  return request.post(
    {
      url: '/change-password/change-password',
      data,
    },
    false,
  )
}
