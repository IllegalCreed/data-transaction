import request from '@/axios'

export const getNewsList = (
  pageNum: number,
  pageSize: number,
  searchValue: string,
): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize,
    searchValue,
  }
  return request.post(
    {
      url: '/getNewsList',
      params,
    },
    false,
  )
}

export const getNews = (id: string | number): Promise<unknown> => {
  const params = {
    id,
  }
  return request.post(
    {
      url: '/getNews',
      params,
    },
    false,
  )
}
