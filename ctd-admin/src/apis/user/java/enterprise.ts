import request from '@/axios'
import type { UserStatus } from '@/constants/mapData/user'

export const getEnterpriseUsers = (
  searchQuery: string,
  status: UserStatus | null,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    status,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/user/enterprise',
      params
    },
    true
  )
}

export const getEnterpriseUser = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/user/enterprise/${id}`
    },
    true
  )
}
