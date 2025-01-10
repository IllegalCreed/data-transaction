import request from '@/axios'

export const getSecurityInfo = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/user/getSecurityInfo',
      params,
    },
    true,
  )
}
