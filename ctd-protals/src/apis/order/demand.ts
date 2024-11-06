import request from '@/axios'

export const getDemandOrders = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getDemandOrders',
      params,
    },
    false,
  )
}

export const getDemandOrderDetail = (id: string | number): Promise<unknown> => {
  const params = { id }
  return request.post(
    {
      url: `/getDemandOrders/${id}`,
      params,
    },
    false,
  )
}

export const getDemandOrderContract = (
  id: string | number,
): Promise<unknown> => {
  const params = { id }
  return request.post(
    {
      url: `/getDemandOrderContract/${id}`,
      params,
    },
    false,
  )
}

export const getDemandOrderReview = (id: string | number): Promise<unknown> => {
  const params = { id }
  return request.post(
    {
      url: `/getDemandOrderReview/${id}`,
      params,
    },
    false,
  )
}
