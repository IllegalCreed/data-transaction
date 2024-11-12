import { defineStore } from 'pinia'
import { useBusiness } from './business'

export const useBusinessStore = defineStore('business', () => {
  const { getBusinessOptionsByName } = useBusiness()

  return {
    ...{
      getBusinessOptionsByName
    }
  }
})
