import request from '@/axios'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'
import type { IEnterpriseUserItem } from '@/types/user'

export const getEnterpriseUsers = (
  searchQuery: string,
  filters: IFilterDTO<IEnterpriseUserItem>[],
  sorts: ISort<IEnterpriseUserItem>[],
  columns: ITableColumnDTO<IEnterpriseUserItem>[],
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const data = {
    searchQuery,
    filters,
    sorts,
    columns,
    pageNum,
    pageSize
  }
  return request.post(
    {
      url: '/platform/user/enterprise',
      data
    },
    true
  )
}

export const getEnterpriseUser = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/platform/user/enterprise/${id}`
    },
    true
  )
}
