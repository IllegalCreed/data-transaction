import { defineStore } from 'pinia'
import { useIndividual } from './individual'
import { useEnterprise } from './enterprise'
import { useSettingsStore } from '../settings'
import type { UserStatus } from '@/constants/mapData/user'
import {
  changeUsersStatus as changeUsersStatusAPI,
  deleteUsers as deleteUsersAPI
} from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const { getIndividualUsers, getIndividualUser } = useIndividual()
  const { getEnterpriseUsers, getEnterpriseUser } = useEnterprise()

  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const changeUsersStatus = (ids: (string | number)[], status: UserStatus): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('user')) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        changeUsersStatusAPI(ids, status)
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

  const deleteUsers = (ids: (string | number)[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('user')) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        deleteUsersAPI(ids)
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

  return {
    ...{
      getIndividualUsers,
      getIndividualUser,
      getEnterpriseUsers,
      getEnterpriseUser,
      changeUsersStatus,
      deleteUsers
    }
  }
})
