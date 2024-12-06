import request from '@/axios'

export const getDemandOptionsByName = (searchQuery: string): Promise<unknown> => {
  const params = {
    searchQuery
  }
  return request.get(
    {
      url: '/demand/get-options-by-name',
      params
    },
    true
  )
}

export const getDemandOptionsByID = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.get(
    {
      url: '/demand/get-options-by-id',
      params
    },
    true
  )
}
