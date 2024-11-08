import request from '@/axios'

export const getFavoriteProducts = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getFavoriteProducts',
      params,
    },
    false,
  )
}

export const getFavoriteDemands = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getFavoriteDemands',
      params,
    },
    false,
  )
}
