import request from '@/axios'

export const getProductFilterSource = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getFilterSource',
      params
    },
    false
  )
}
