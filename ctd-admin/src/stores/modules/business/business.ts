import { useSettingsStore } from '../settings'
import type { IOption } from '@/types/common'
import { getBusinessOptionsByName as getBusinessOptionsByNameAPI } from '@/apis/business'
import { businessOptions as mockBusinessOptions } from '@/constants/mockData/business'

export const useBusiness = () => {
  const settingsStore = useSettingsStore()

  const getBusinessOptionsByName = (searchQuery: string): Promise<IOption[]> => {
    return new Promise<IOption[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockBusinessOptions)
        }, 1000)
      } else {
        getBusinessOptionsByNameAPI(searchQuery)
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
    getBusinessOptionsByName
  }
}
