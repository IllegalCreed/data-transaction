import request from '@/axios'
import type { IFilterDTO, ISortDTO } from '@/types/table'

export const getEnterpriseUsers = (
  searchQuery: string,
  filters: IFilterDTO[],
  sorts: ISortDTO[],
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    filters,
    sorts,
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
