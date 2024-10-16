import request from '@/axios'

export const getLinks = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getLinks',
      params
    },
    false
  )
}
