import request from '@/axios'

export const getBanners = (): Promise<void> => {
  const params = {}
  return request.get(
    {
      url: '/getBanners',
      params
    },
    false
  )
}
