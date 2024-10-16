import request from '@/axios'

export const getRecords = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getRecords',
      params
    },
    false
  )
}
