import request from '@/axios'
import type { VerificationCodes } from '@/constants/mapData/mail'

export const sendVerificationCode = (
  email: string,
  type: VerificationCodes,
): Promise<unknown> => {
  const data = { email, type }
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

export const verifyCode = (
  email: string,
  code: string,
  type: VerificationCodes,
): Promise<unknown> => {
  const data = { email, code, type }
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
