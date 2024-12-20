import { useSettingsStore } from '../settings'
import type { apiListResult } from '@/types/common'
import type { IIndividualUser, IIndividualUserItem } from '@/types/user'
import {
  getIndividualUsers as getIndividualUsersAPI,
  getIndividualUser as getIndividualUserAPI
} from '@/apis/user'

import { individualUsers as mockIndividualUsers } from '@/constants/mockData/user/individual'
import type { IFilterDTO, ISort, ITableColumn } from '@/types/table'

export const useIndividual = () => {
  const settingsStore = useSettingsStore()

  const getIndividualUsers = (
    searchQuery: string,
    filters: IFilterDTO<IIndividualUserItem>[],
    sorts: ISort<IIndividualUserItem>[],
    columns: ITableColumn<IIndividualUserItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<IIndividualUserItem>> => {
    return new Promise<apiListResult<IIndividualUserItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockIndividualUsers.filter((item) => {
            const searchMatch = searchQuery ? item.fullName.includes(searchQuery) : true
            return searchMatch
          })
          if (pageNum === 1) {
            resolve({ total: 20, rows: result.slice(0, 5) })
          } else {
            resolve({ total: 20, rows: result.splice(5) })
          }
        }, 1000)
      } else {
        getIndividualUsersAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<IIndividualUserItem>
            for (const item of result.rows) {
              item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
              item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
            }
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
      if (settingsStore.mockEnabled) {
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
