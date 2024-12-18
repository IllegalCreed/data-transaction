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
  const javaParam: Record<string, string> = {}
  Object.assign(javaParam, filters)
  for (const key in javaParam) {
    if (javaParam[key] === 'all') {
      delete javaParam[key]
    }
  }
  javaParam['search_type'] = searchType
  javaParam[sorts.sortType] = sorts.order === 'asc' ? '1' : '0'
  const params = {
    pageNum,
    pageSize,
    searchValue,
    params: javaParam,
  }
  return request.get(
    {
      url: '/api/c/product/listProduct',
      params,
    },
    false,
  )
}

export const getProduct = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.get(
    {
      url: `/api/c/product/getProductInfo/${id}`,
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
  const data = {
    prodCode: id,
    prodVersionCode: versionId,
    list: specs,
  }
  return request.post(
    {
      url: `/api/c/product/getProductPrice`,
      data,
    },
    false,
  )
}

export const getProductImages = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.get(
    {
      url: `/api/c/product/getProductInfo/${id}`,
      params,
    },
    false,
  )
}

export const getProductContent = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.get(
    {
      url: `/api/c/product/getProductInfo/${id}`,
      params,
    },
    false,
  )
}
