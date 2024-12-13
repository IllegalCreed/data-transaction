import request from '@/axios'

export const getLinks = (): Promise<unknown> => {
  const params = {
    isFriendshipLink: 1,
  }
  return request.get(
    {
      url: '/api/c/common/listCompany',
      params,
    },
    false,
  )
}
