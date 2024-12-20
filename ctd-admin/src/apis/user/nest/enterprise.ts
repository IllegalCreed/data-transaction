import request from '@/axios'
import type { IFilterDTO, ISort } from '@/types/table'
import type { IEnterpriseUserItem } from '@/types/user'

export const getEnterpriseUsers = (
  searchQuery: string,
  filters: IFilterDTO<IEnterpriseUserItem>[],
  sorts: ISort<IEnterpriseUserItem>[],
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
