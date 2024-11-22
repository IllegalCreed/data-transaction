import request from '@/axios'
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

export const delProducts = (ids: (string | number)[]): Promise<unknown> => {
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
      url: `/product/${productId}/0/update`,
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
      url: `/product/${productId}/0/price/update`,
      data
    },
    true
  )
}
