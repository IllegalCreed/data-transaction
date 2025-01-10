import { useSettingsStore } from '../settings'
import type { apiListResult, ICommonReturn } from '@/types/common'
import type { IIndividualUser, IIndividualUserItem } from '@/types/user'
import {
  getIndividualUsers as getIndividualUsersAPI,
  getIndividualUser as getIndividualUserAPI
} from '@/apis/user'

import { individualUsers as mockIndividualUsers } from '@/constants/mockData/user/individual'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const useIndividual = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const getIndividualUsers = (
    searchQuery: string,
    filters: IFilterDTO<IIndividualUserItem>[],
    sorts: ISort<IIndividualUserItem>[],
    columns: ITableColumnDTO<IIndividualUserItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<ICommonReturn<apiListResult<IIndividualUserItem>>> => {
    return new Promise<ICommonReturn<apiListResult<IIndividualUserItem>>>((resolve, reject) => {
      if (findMockTreeValueByKey('user')) {
        window.setTimeout(() => {
          const result = mockIndividualUsers.filter((item) => {
            const searchMatch = searchQuery ? item.fullName.includes(searchQuery) : true
            return searchMatch
          })
          if (pageNum === 1) {
            resolve({ data: { total: 10, rows: result }, code: 0, msg: 'success' })
          }
        }, 1000)
      } else {
        getIndividualUsersAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as ICommonReturn<apiListResult<IIndividualUserItem>>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getIndividualUser = (id: string | number): Promise<IIndividualUser> => {
    return new Promise<IIndividualUser>((resolve, reject) => {
      if (findMockTreeValueByKey('user')) {
        window.setTimeout(() => {
          const result = mockIndividualUsers.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('User not found'))
          }
        }, 1000)
      } else {
        getIndividualUserAPI(id)
          .then((res) => {
            const result = res as IIndividualUser
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
    getIndividualUsers,
    getIndividualUser
  }
}
