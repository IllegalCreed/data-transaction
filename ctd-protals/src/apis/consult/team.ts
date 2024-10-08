import request from '@/axios'

export const getTeams = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getTeams',
      params
    },
    false
  )
}
