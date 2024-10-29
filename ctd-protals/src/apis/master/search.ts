import request from '@/axios'

export const getHistoryRecords = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getHistoryRecords',
      params,
    },
    false,
  )
}

export const getSearchResults = (keyword: string): Promise<unknown> => {
  const params = {
    keyword,
  }
  return request.get(
    {
      url: '/getSearchResults',
      params,
    },
    false,
  )
}
