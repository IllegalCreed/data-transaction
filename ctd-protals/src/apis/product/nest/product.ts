import request from '@/axios'
import type { IProductPriceQuery } from '@/types/product'
import type { ISortValue } from '@/types/sorting'

export const getProducts = (
  pageNum: number,
  pageSize: number,
  searchType: string,
  searchValue: string,
  filters: Record<string, string>,
  sorts: ISortValue,
): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize,
    searchType,
    searchValue,
    filters,
    sorts,
  }
  return request.post(
    {
      url: '/getProducts',
      params,
    },
    false,
  )
}

export const getProduct = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.post(
    {
      url: `/getProduct/${id}`,
      params,
    },
    false,
  )
}

export const getPrice = (
  id: string | number,
  versionId: string | number,
  specs: IProductPriceQuery[],
): Promise<unknown> => {
  const params = {
    specs,
  }
  return request.post(
    {
      url: `/getPrice`,
      params,
    },
    false,
  )
}

export const getProductImages = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.post(
    {
      url: `/getProductImages/${id}`,
      params,
    },
    false,
  )
}

export const getProductContent = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.post(
    {
      url: `/getProductContent/${id}`,
      params,
    },
    false,
  )
}
