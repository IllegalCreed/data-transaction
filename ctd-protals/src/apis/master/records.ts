import request from '@/axios'

export const getRecords = (): Promise<void> => {
  const params = {}
  return request.get(
    {
      url: '/getRecords',
      params
    },
    false
  )
}
