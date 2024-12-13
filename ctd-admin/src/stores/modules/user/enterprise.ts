import { useSettingsStore } from '../settings'
import type { UserStatus } from '@/constants/mapData/user'
import type { apiListResult } from '@/types/common'
import type { IEnterpriseUser, IEnterpriseUserItem } from '@/types/user'
import {
  getEnterpriseUsers as getEnterpriseUsersAPI,
  getEnterpriseUser as getEnterpriseUserAPI
} from '@/apis/user'
import { enterpriseUsers as mockEnterpriseUsers } from '@/constants/mockData/user/enterprise'

export const useEnterprise = () => {
  const settingsStore = useSettingsStore()

  const getEnterpriseUsers = (
    searchQuery: string,
    status: UserStatus | null,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<IEnterpriseUserItem>> => {
    return new Promise<apiListResult<IEnterpriseUserItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockEnterpriseUsers.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const searchMatch = searchQuery ? item.enterpriseName.includes(searchQuery) : true
            return statusMatch && searchMatch
          })
          resolve({ total: result.length, rows: result })
        }, 1000)
      } else {
        getEnterpriseUsersAPI(searchQuery, status, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<IEnterpriseUserItem>
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
      if (settingsStore.mockEnabled) {
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
            const result = res as IEnterpriseUser
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
    getEnterpriseUsers,
    getEnterpriseUser
  }
}
