import { useSettingsStore } from '../settings'
import type { apiListResult, ICommonReturn } from '@/types/common'
import type { IEnterpriseUser, IEnterpriseUserItem } from '@/types/user'
import {
  getEnterpriseUsers as getEnterpriseUsersAPI,
  getEnterpriseUser as getEnterpriseUserAPI
} from '@/apis/user'
import { enterpriseUsers as mockEnterpriseUsers } from '@/constants/mockData/user/enterprise'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const useEnterprise = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const getEnterpriseUsers = (
    searchQuery: string,
    filters: IFilterDTO<IEnterpriseUserItem>[],
    sorts: ISort<IEnterpriseUserItem>[],
    columns: ITableColumnDTO<IEnterpriseUserItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<ICommonReturn<apiListResult<IEnterpriseUserItem>>> => {
    return new Promise<ICommonReturn<apiListResult<IEnterpriseUserItem>>>((resolve, reject) => {
      if (findMockTreeValueByKey('user')) {
        window.setTimeout(() => {
          const result = mockEnterpriseUsers.filter((item) => {
            const searchMatch = searchQuery ? item.enterpriseName.includes(searchQuery) : true
            return searchMatch
          })
          if (pageNum === 1) {
            resolve({ data: { total: 10, rows: result }, code: 0, msg: 'success' })
          }
        }, 1000)
      } else {
        getEnterpriseUsersAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as ICommonReturn<apiListResult<IEnterpriseUserItem>>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getEnterpriseUser = (id: string | number): Promise<IEnterpriseUser> => {
    return new Promise<IEnterpriseUser>((resolve, reject) => {
      if (findMockTreeValueByKey('user')) {
        window.setTimeout(() => {
          const result = mockEnterpriseUsers.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('User not found'))
          }
        }, 1000)
      } else {
        getEnterpriseUserAPI(id)
          .then((res) => {
            const result = res as ICommonReturn<IEnterpriseUser>
            resolve(result.data)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getEnterpriseUsers,
    getEnterpriseUser
  }
}
