import { defineStore } from 'pinia'

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
