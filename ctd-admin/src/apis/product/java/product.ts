import request from '@/axios'

export const getProducts = (
  searchQuery: string,
  status: string,
  sellerId: string | number,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
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
