import request from '@/axios'
import type { VerificationCodes } from '@/constants/mapData/mail'

export const sendVerificationCode = (
  email: string,
  type: VerificationCodes,
): Promise<unknown> => {
  const data = { email, type }
  return request.post(
    {
      url: '/mailer/send-verification-code',
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
      url: '/mailer/verify-code',
      data,
    },
    true,
  )
}
