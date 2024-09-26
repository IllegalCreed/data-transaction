import request from '@/axios'

export const getNewsList = (pageNum: number, pageSize: number): Promise<void> => {
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
