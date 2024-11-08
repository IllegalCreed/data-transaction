import request from '@/axios'

export const getProductComments = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getProductComments',
      params,
    },
    false,
  )
}

export const getDemandComments = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getDemandComments',
      params,
    },
    false,
  )
}
