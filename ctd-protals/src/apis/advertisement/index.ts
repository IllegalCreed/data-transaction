import request from '@/axios'

export const getBanners = (): Promise<void> => {
  const data = {}
  return request.post(
    {
      url: '/getBanners',
      data
    },
    false
  )
}
