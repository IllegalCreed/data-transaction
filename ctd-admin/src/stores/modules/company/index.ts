import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { IOption } from '@/types/common'
import { getCompanyOptionsByName as getCompanyOptionsByNameAPI } from '@/apis/company'
import { companyOptions as mockCompanyOptions } from '@/constants/mockData/company'

export const useCompanyStore = defineStore('company', () => {
  const settingsStore = useSettingsStore()

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
    getCompanyOptionsByName
  }
})
