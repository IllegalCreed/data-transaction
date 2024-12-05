import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult, IOption } from '@/types/common'
import {
  getCompanies as getCompaniesAPI,
  getCompany as getCompanyAPI,
  upsertCompany as upsertCompanyAPI,
  changeCompaniesStatus as changeCompaniesStatusAPI,
  deleteCompanies as deleteCompaniesAPI,
  getCompanyOptionsByName as getCompanyOptionsByNameAPI
} from '@/apis/company'
import {
  companyOptions as mockCompanyOptions,
  companies as mockCompanies
} from '@/constants/mockData/company'
import type { ActiveStatus } from '@/constants/mapData'
import type { PartnerTypes } from '@/constants/mapData/company'
import type { ICompany, ICompanyDTO, ICompanyItem } from '@/types/company'

export const useCompanyStore = defineStore('company', () => {
  const settingsStore = useSettingsStore()

  const getCompanies = (
    searchQuery: string,
    status: ActiveStatus,
    partnerType: PartnerTypes,
    isShowInFooter: boolean | undefined,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<ICompanyItem>> => {
    return new Promise<apiListResult<ICompanyItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockCompanies.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const partnerTypeMatch = partnerType ? item.partnerType === partnerType : true
            const isShowInFooterMatch =
              isShowInFooter !== undefined ? item.isShowInFooter === isShowInFooter : true
            const searchMatch = searchQuery ? item.name.includes(searchQuery) : true

            return statusMatch && searchMatch && partnerTypeMatch && isShowInFooterMatch
          })

          resolve({ total: result.length, rows: result })
        }, 1000)
      } else {
        getCompaniesAPI(searchQuery, status, partnerType, isShowInFooter, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<ICompanyItem>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getCompany = (id: string | number): Promise<ICompany> => {
    return new Promise<ICompany>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockCompanies.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Company not found'))
          }
        }, 1000)
      } else {
        getCompanyAPI(id)
          .then((res) => {
            const result = res as ICompany
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const upsertCompany = (id: string | number, CompanyInfo: ICompanyDTO): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        upsertCompanyAPI(id, CompanyInfo)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const changeCompaniesStatus = (ids: (string | number)[], status: ActiveStatus): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        changeCompaniesStatusAPI(ids, status)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const deleteCompanies = (ids: (string | number)[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        deleteCompaniesAPI(ids)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getCompanyOptionsByName = (searchQuery: string): Promise<IOption[]> => {
    return new Promise<IOption[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockCompanyOptions)
        }, 1000)
      } else {
        getCompanyOptionsByNameAPI(searchQuery)
          .then((res) => {
            const result = res as IOption[]
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getCompanies,
    getCompany,
    upsertCompany,
    changeCompaniesStatus,
    deleteCompanies,
    getCompanyOptionsByName
  }
})
