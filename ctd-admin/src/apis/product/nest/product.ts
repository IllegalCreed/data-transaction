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

export const getProduct = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/product/${id}`
    },
    true
  )
}

export const deleteProducts = (ids: (string | number)[]): Promise<unknown> => {
  const params = {
    ids
  }
  return request.delete(
    {
      url: '/product/del',
      params
    },
    true
  )
}

export const getVersion = (
  productId: string | number,
  version: string | number
): Promise<unknown> => {
  return request.get(
    {
      url: `/product/${productId}/${version}`
    },
    true
  )
}

export const getPriceDefinition = (
  productId: string | number,
  version: string | number
): Promise<unknown> => {
  return request.get(
    {
      url: `/product/${productId}/${version}/price`
    },
    true
  )
}
