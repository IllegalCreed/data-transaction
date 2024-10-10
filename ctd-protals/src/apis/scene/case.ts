import request from '@/axios'

export const getCases = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getCases',
      params
    },
    false
  )
}
