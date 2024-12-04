import request from '@/axios'

export const getCompanyOptionsByName = (searchQuery: string): Promise<unknown> => {
  const params = {
    searchQuery
  }
  return request.get(
    {
      url: '/company/getOptionsByName',
      params
    },
    true
  )
}
