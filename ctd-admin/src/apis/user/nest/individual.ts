import request from '@/axios'
import type { UserStatus } from '@/constants/mapData/user'

export const getIndividualUsers = (
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
      url: '/user/individual',
      params
    },
    true
  )
}

export const getIndividualUser = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/user/individual/${id}`
    },
    true
  )
}
