import request from '@/axios'
export const getRegisterAdsAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getRegisterAdsAPI',
      params
    },
    true
  )
}
