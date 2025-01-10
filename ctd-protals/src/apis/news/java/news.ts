import request from '@/axios'

export const getNewsList = (
  pageNum: number,
  pageSize: number,
  searchValue: string,
): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize,
    bizInfoTitle: searchValue,
  }
  return request.get(
    {
      url: '/api/c/common/listInformation',
      params,
    },
    false,
  )
}

export const getNews = (id: string | number): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: `api/c/common/getInformation/${id}`,
      params,
    },
    false,
  )
}
