import request from '@/axios'

export const getCases = (
  pageNum: number,
  pageSize: number,
): Promise<unknown> => {
  const params = {
    pageNum,
    pageSize,
  }
  return request.get(
    {
      url: '/api/c/common/listScene',
      params,
    },
    false,
  )
}

export const getScene = (id: number | string): Promise<unknown> => {
  const params = {
    id,
  }
  return request.get(
    {
      url: `/api/c/common/getScene/${id}`,
      params,
    },
    false,
  )
}
