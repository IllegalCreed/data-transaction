import request from '@/axios'

export const getProducts = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getProducts',
      params
    },
    false
  )
}

export const getProduct = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getProduct/${id}`,
      params
    },
    false
  )
}

export const getPrice = (specs: Record<string, string>): Promise<unknown> => {
  const params = {
    specs
  }
  return request.post(
    {
      url: `/getPrice`,
      params
    },
    false
  )
}

export const getRecommendProducts = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getRecommendProducts/${id}`,
      params
    },
    false
  )
}

export const getProductImages = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getProductImages/${id}`,
      params
    },
    false
  )
}
