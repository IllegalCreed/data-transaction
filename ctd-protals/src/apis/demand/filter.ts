import request from '@/axios'

export const getFilterSource = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getFilterSource',
      params
    },
    false
  )
}
