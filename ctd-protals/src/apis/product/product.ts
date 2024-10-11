import request from '@/axios'

export const getProducts = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getProducts',
      params
    },
    false
  )
}

export const getProduct = (id: string | number): Promise<void> => {
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

export const getPrice = (specs: Record<string, string>): Promise<void> => {
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
