import request from '@/axios'

export const getTeams = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getTeams',
      params
    },
    false
  )
}
