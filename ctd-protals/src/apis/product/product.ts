import request from '@/axios'

export const getProducts = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getProducts',
      params
    },
    false
  )
}
