import request from '@/axios'

export const getProductApprovalLogs = (productId: string | number): Promise<unknown> => {
  const params = {
    productId
  }
  return request.get(
    {
      url: `/product/approval/logs/${productId}`,
      params
    },
    true
  )
}

export const getProductRejectReason = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.get(
    {
      url: `/product/approval/resson/${id}`,
      params
    },
    true
  )
}
