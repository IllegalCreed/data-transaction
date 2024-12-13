import request from '@/axios'

export const getBanners = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/api/c/common/listBanner',
      params,
    },
    false,
  )
}
