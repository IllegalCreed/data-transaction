import request from '@/axios'

export const getPrimaryCases = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getPrimaryCases',
      params
    },
    false
  )
}
