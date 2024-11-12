import request from '@/axios'

export const getLastRejectReason = (productId: string | number): Promise<unknown> => {
  const params = {
    productId
  }
  return request.get(
    {
      url: '/product/approval/getLastRejectReason',
      params
    },
    true
  )
}

export const getProductApprovalLogs = (productId: string | number): Promise<unknown> => {
  const params = {
    productId
  }
  return request.get(
    {
      url: '/product/approval/get',
      params
    },
    true
  )
}
