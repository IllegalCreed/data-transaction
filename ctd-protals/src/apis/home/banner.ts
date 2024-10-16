import request from '@/axios'

export const getBanners = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getBanners',
      params
    },
    false
  )
}
