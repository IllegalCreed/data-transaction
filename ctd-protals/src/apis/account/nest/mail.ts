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
    false,
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
    false,
  )
}

export const sendVerificationCodeAuth = (
  type: VerificationCodes,
): Promise<unknown> => {
  const data = { type }
  return request.post(
    {
      url: '/mailer/send-verification-code/auth',
      data,
    },
    true,
  )
}

export const verifyCodeAuth = (
  code: string,
  type: VerificationCodes,
): Promise<unknown> => {
  const data = { code, type }
  return request.post(
    {
      url: '/mailer/verify-code/auth',
      data,
    },
    true,
  )
}
