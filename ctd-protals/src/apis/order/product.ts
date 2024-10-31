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

export const getProductOrderDetail = (
  id: string | number,
): Promise<unknown> => {
  const params = { id }
  return request.post(
    {
      url: `/getProductOrders/${id}`,
      params,
    },
    false,
  )
}
