import request from '@/axios'

export const getLinks = (): Promise<void> => {
  const params = {}
  return request.get(
    {
      url: '/getLinks',
      params
    },
    false
  )
}
