import request from '@/axios'

export const getContact = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getContact',
      params
    },
    false
  )
}
