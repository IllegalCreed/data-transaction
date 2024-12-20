import request from '@/axios'
import type { IFilterDTO, ISort, ITableColumn } from '@/types/table'
import type { IIndividualUserItem } from '@/types/user'

export const getIndividualUsers = (
  searchQuery: string,
  filters: IFilterDTO<IIndividualUserItem>[],
  sorts: ISort<IIndividualUserItem>[],
  columns: ITableColumn<IIndividualUserItem>[],
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    filters,
    sorts,
    columns,
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
