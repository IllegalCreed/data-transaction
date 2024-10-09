import request from '@/axios'

export const getDemands = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getDemands',
      params
    },
    false
  )
}
