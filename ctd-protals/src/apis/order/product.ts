import request from '@/axios'

export const getProductOrders = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getProductOrders',
      params,
    },
    false,
  )
}
