import request from '@/axios'

export const getProducts = (
  pageNum: number,
  pageSize: number,
  searchType: string,
  searchValue: string,
  param: Record<string, string>,
): Promise<unknown> => {
  const javaParam: Record<string, string> = {}
  Object.assign(javaParam, param)
  javaParam['search-type'] = searchType
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

export const getPrice = (specs: Record<string, string>): Promise<unknown> => {
  const params = {
    specs,
  }
  return request.get(
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
