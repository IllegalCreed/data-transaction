import request from '@/axios'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'
import type { IIndividualUserItem } from '@/types/user'

export const getIndividualUsers = (
  searchQuery: string,
  filters: IFilterDTO<IIndividualUserItem>[],
  sorts: ISort<IIndividualUserItem>[],
  columns: ITableColumnDTO<IIndividualUserItem>[],
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
      url: '/platform/user/individual',
      data
    },
    true
  )
}

export const getIndividualUser = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/platform/user/individual/${id}`
    },
    true
  )
}
