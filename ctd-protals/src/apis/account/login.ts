import request from '@/axios'
export const getAdAPI = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '',
      params
    },
    true
  )
}
