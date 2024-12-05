import { defineStore } from 'pinia'
import { useDemand } from './demand'

export const useDemandStore = defineStore('demand', () => {
  const { getDemandOptionsByName, getDemandOptionsByID } = useDemand()

  return {
    // useDemand
    ...{ getDemandOptionsByName, getDemandOptionsByID }
  }
})
