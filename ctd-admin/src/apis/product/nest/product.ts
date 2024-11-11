import request from '@/axios'

export const getProducts = (
  title: string,
  status: string,
  sellerId: string | number,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    title,
    status,
    sellerId,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/product/getlist',
      params
    },
    true
  )
}
