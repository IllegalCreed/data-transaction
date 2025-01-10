import request from '@/axios'

export const verifyPassword = (
  currentPassword: string,
  recoveryCode: string,
): Promise<unknown> => {
  const data = { currentPassword, recoveryCode }
  return request.post(
    {
      url: '/change-email/verify-password',
      data,
    },
    true,
  )
}

export const sendToNewEmail = (
  newEmail: string,
  token: string,
): Promise<unknown> => {
  const data = { newEmail, token }
  return request.post(
    {
      url: '/change-email/send-to-new-email',
      data,
    },
    true,
  )
}

export const changeEmail = (
  newEmail: string,
  code: string,
): Promise<unknown> => {
  const data = { newEmail, code }
  return request.post(
    {
      url: '/change-email',
      data,
    },
    true,
  )
}
