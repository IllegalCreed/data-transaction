import request from '@/axios'
export const getAdsAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getRegisterAdsAPI',
      params
    },
    true
  )
}
