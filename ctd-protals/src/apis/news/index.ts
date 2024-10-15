import request from '@/axios'

export const getNewsList = (pageNum: number, pageSize: number): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize
  }
  return request.post(
    {
      url: '/getNewsList',
      params
    },
    false
  )
}
