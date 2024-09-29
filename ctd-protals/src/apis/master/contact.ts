import request from '@/axios'

export const getContact = (): Promise<void> => {
  const params = {}
  return request.get(
    {
      url: '/getContact',
      params
    },
    false
  )
}
