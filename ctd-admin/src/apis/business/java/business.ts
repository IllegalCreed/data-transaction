import request from '@/axios'

export const getBusinessOptionsByName = (searchQuery: string): Promise<unknown> => {
  const params = {
    searchQuery
  }
  return request.get(
    {
      url: '/business/getOptionsByName',
      params
    },
    true
  )
}
