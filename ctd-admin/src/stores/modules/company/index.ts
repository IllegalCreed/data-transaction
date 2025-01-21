import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult, ICommonReturn, IOption } from '@/types/common'
import {
  getCompanies as getCompaniesAPI,
  getCompany as getCompanyAPI,
  upsertCompany as upsertCompanyAPI,
  changeCompaniesStatus as changeCompaniesStatusAPI,
  deleteCompanies as deleteCompaniesAPI,
  getCompanyOptionsByName as getCompanyOptionsByNameAPI,
  getCompanyOptionsByID as getCompanyOptionsByIDAPI
} from '@/apis/company'
import {
  companyOptions as mockCompanyOptions,
  companies as mockCompanies
} from '@/constants/mockData/company'
import type { ActiveStatus } from '@/constants/mapData'
import type { ICompany, ICompanyDTO, ICompanyItem } from '@/types/company'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const useCompanyStore = defineStore('company', () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const getCompanies = (
    searchQuery: string,
    filters: IFilterDTO<ICompanyItem>[],
    sorts: ISort<ICompanyItem>[],
    columns: ITableColumnDTO<ICompanyItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<ICommonReturn<apiListResult<ICompanyItem>>> => {
    return new Promise<ICommonReturn<apiListResult<ICompanyItem>>>((resolve, reject) => {
      if (findMockTreeValueByKey('company')) {
        window.setTimeout(() => {
          const result = mockCompanies.filter((item) => {
            const searchMatch = searchQuery ? item.name.includes(searchQuery) : true

            return searchMatch
          })

          resolve({ data: { total: 10, rows: result }, code: 0, msg: 'success' })
        }, 1000)
      } else {
        getCompaniesAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as ICommonReturn<apiListResult<ICompanyItem>>
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
      if (findMockTreeValueByKey('company')) {
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
            const result = res as ICommonReturn<ICompany>
            resolve(result.data)
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
      if (findMockTreeValueByKey('company')) {
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
      if (findMockTreeValueByKey('company')) {
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
      if (findMockTreeValueByKey('company')) {
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

  const getCompanyOptionsByID = (id: string | number): Promise<IOption> => {
    return new Promise<IOption>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockCompanyOptions.find((item) => item.value === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Company not found'))
          }
        }, 1000)
      } else {
        getCompanyOptionsByIDAPI(id)
          .then((res) => {
            const result = res as IOption
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
    getCompanyOptionsByName,
    getCompanyOptionsByID
  }
})
