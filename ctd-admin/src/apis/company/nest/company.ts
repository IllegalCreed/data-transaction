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
      url: '/platform/company/list',
      data
    },
    true
  )
}

export const getCompany = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/platform/company/${id}`
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
      url: '/platform/company/upsert',
      data
    },
    true
  )
}

export const changeCompaniesStatus = (
  ids: (string | number)[],
  status: ActiveStatus
): Promise<unknown> => {
  const data = {
    ids,
    status
  }
  return request.post(
    {
      url: '/platform/company/change-status',
      data
    },
    true
  )
}

export const deleteCompanies = (ids: (string | number)[]): Promise<unknown> => {
  const data = {
    ids
  }
  return request.post(
    {
      url: '/platform/company/delete',
      data
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
      url: '/platform/company/get-options-by-name',
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
      url: '/platform/company/get-options-by-id',
      params
    },
    true
  )
}
