import request from '@/axios'

export const getPrimaryCases = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getPrimaryCases',
      params
    },
    false
  )
}
