import request from '@/axios'

export const getDemands = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getDemands',
      params
    },
    false
  )
}

export const getDemand = (id: string | number): Promise<void> => {
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

export const getRecommendDemands = (id: string | number): Promise<void> => {
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
