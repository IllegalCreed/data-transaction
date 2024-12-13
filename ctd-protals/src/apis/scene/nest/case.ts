import request from '@/axios'

export const getCases = (
  pageNum: number,
  pageSize: number,
): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize,
  }
  return request.post(
    {
      url: '/getCases',
      params,
    },
    false,
  )
}

export const getScene = (id: number | string): Promise<unknown> => {
  const params = {
    id,
  }
  return request.post(
    {
      url: `/getScene/${id}`,
      params,
    },
    false,
  )
}
