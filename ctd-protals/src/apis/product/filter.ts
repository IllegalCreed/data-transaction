import request from '@/axios'

export const getProductFilterSource = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getFilterSource',
      params
    },
    false
  )
}
