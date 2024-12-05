import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { PartnerTypes } from '@/constants/mapData/company'
import type { ICompanyDTO } from '@/types/company'

export const getCompanies = (
  searchQuery: string,
  status: ActiveStatus | null,
  partnerType: PartnerTypes | null,
  isShowInFooter: boolean | null,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    status,
    partnerType,
    isShowInFooter,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/company',
      params
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
