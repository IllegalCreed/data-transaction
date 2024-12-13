import request from '@/axios'

export const getNewsList = (
  pageNum: number,
  pageSize: number,
): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize,
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
