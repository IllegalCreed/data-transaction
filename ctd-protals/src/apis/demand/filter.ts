import request from '@/axios'

export const getDemandFilterSource = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getFilterSource',
      params
    },
    false
  )
}
