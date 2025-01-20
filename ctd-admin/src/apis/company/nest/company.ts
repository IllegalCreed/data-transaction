import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { ICompanyDTO, ICompanyItem } from '@/types/company'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const getCompanies = (
  searchQuery: string,
  filters: IFilterDTO<ICompanyItem>[],
  sorts: ISort<ICompanyItem>[],
  columns: ITableColumnDTO<ICompanyItem>[],
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
      url: '/company/list',
      data
    },
    true
  )
}

export const getCompany = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/company/${id}`
    },
    true
  )
}

export const upsertCompany = (id: string | number, companyInfo: ICompanyDTO): Promise<unknown> => {
  const data = {
    id,
    ...companyInfo
  }

  return request.post(
    {
      url: '/company/upsert',
      data
    },
    true
  )
}

export const changeCompaniesStatus = (
  ids: (string | number)[],
  status: ActiveStatus
): Promise<unknown> => {
  const params = {
    ids,
    status
  }
  return request.put(
    {
      url: '/company/change-status',
      params
    },
    true
  )
}

export const deleteCompanies = (ids: (string | number)[]): Promise<unknown> => {
  const params = {
    ids
  }
  return request.delete(
    {
      url: '/company/delete',
      params
    },
    true
  )
}

export const getCompanyOptionsByName = (searchQuery: string): Promise<unknown> => {
  const params = {
    searchQuery
  }
  return request.get(
    {
      url: '/company/get-options-by-name',
      params
    },
    true
  )
}

export const getCompanyOptionsByID = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.get(
    {
      url: '/company/get-options-by-id',
      params
    },
    true
  )
}
