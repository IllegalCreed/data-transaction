import request from '@/axios'
import type { IFilterDTO, ISortDTO } from '@/types/table'

export const getIndividualUsers = (
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
