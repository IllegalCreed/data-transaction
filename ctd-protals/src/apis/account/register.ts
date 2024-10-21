import request from '@/axios'
import type { RegistInfoType } from '@/types/register'

export const getRegisterAPI = (
  registerInfo: RegistInfoType,
): Promise<unknown> => {
  const params = { ...registerInfo }
  return request.get(
    {
      url: '/getRegisterAdsAPI',
      params,
    },
    true,
  )
}

export const getRegisterAdsAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getRegisterAdsAPI',
      params,
    },
    true,
  )
}
