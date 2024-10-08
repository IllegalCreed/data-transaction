import { defineStore } from 'pinia'
import { useBanner } from './banner'
import { useServices } from './service'
import { useSteps } from './step'

export const useServiceStore = defineStore('service', () => {
  const { banner, getBanner } = useBanner()
  const { services, getServices } = useServices()
  const { steps, getSteps } = useSteps()

  return {
    banner,
    getBanner,
    services,
    getServices,
    steps,
    getSteps
  }
})
