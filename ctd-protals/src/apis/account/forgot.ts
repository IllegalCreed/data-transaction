import request from '@/axios'
export const getForgotAdsAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getForgotAdsAPI',
      params
    },
    true
  )
}
