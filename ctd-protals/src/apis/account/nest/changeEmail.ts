import request from '@/axios'

export const verifyPassword = (
  currentPassword: string,
  RecoveryCode: string,
): Promise<unknown> => {
  const data = { currentPassword, RecoveryCode }
  return request.post(
    {
      url: '/change-email/verify-password',
      data,
    },
    true,
  )
}

export const sendToNewEmail = (
  email: string,
  token: string,
): Promise<unknown> => {
  const data = { email, token }
  return request.post(
    {
      url: '/change-email/send-to-new-email',
      data,
    },
    true,
  )
}

export const changeEmail = (email: string, code: string): Promise<unknown> => {
  const data = { email, code }
  return request.post(
    {
      url: '/change-email/change-password',
      data,
    },
    true,
  )
}
