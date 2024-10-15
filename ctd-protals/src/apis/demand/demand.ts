import request from '@/axios'

export const getDemands = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getDemands',
      params
    },
    false
  )
}

export const getDemand = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getDemand/${id}`,
      params
    },
    false
  )
}

export const getDemandDetail = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getDemandDetail/${id}`,
      params
    },
    false
  )
}

export const getRecommendDemands = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getRecommendDemands/${id}`,
      params
    },
    false
  )
}
