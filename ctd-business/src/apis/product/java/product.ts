import request from '@/axios'
import type { ProductStatus } from '@/constants/mapData/product'
import type { IProductSpecsPriceDefinition, IProductVersion } from '@/types/product'

export const getProducts = (
  searchQuery: string,
  status: string,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    status,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/product',
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

export const changeProductStatus = (
  ids: (string | number)[],
  status: ProductStatus
): Promise<unknown> => {
  const data = {
    ids,
    status
  }
  return request.put(
    {
      url: '/product/change-status',
      data
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
  const params = {
    productId,
    version
  }
  return request.get(
    {
      url: `/product/version`,
      params
    },
    true
  )
}

export const getPriceDefinition = (
  productId: string | number,
  version: string | number
): Promise<unknown> => {
  const params = {
    productId,
    version
  }
  return request.get(
    {
      url: `/product/price`,
      params
    },
    true
  )
}

export const setVersion = (
  productId: string | number,
  versionInfo: IProductVersion
): Promise<unknown> => {
  const data = {
    productId,
    versionInfo
  }
  return request.post(
    {
      url: `/product/version/update`,
      data
    },
    true
  )
}

export const setPriceDefinition = (
  productId: string | number,
  priceInfo: IProductSpecsPriceDefinition
): Promise<unknown> => {
  const data = {
    productId,
    priceInfo
  }
  return request.get(
    {
      url: `/product/price/update`,
      data
    },
    true
  )
}
