import type { IOption } from '@/types/common'
import { useSettingsStore } from '../settings'
import {
  getDemandOptionsByName as getDemandOptionsByNameAPI,
  getDemandOptionsByID as getDemandOptionsByIDAPI
} from '@/apis/demand'
import { demandOptions as mockDemandOptions } from '@/constants/mockData/demand'

export const useDemand = () => {
  const settingsStore = useSettingsStore()

  const getDemandOptionsByName = (searchQuery: string): Promise<IOption[]> => {
    return new Promise<IOption[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockDemandOptions)
        }, 1000)
      } else {
        getDemandOptionsByNameAPI(searchQuery)
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

  const getDemandOptionsByID = (id: string | number): Promise<IOption> => {
    return new Promise<IOption>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockDemandOptions.find((item) => item.value === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Demand not found'))
          }
        }, 1000)
      } else {
        getDemandOptionsByIDAPI(id)
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
    getDemandOptionsByName,
    getDemandOptionsByID
  }
}
