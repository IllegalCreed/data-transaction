import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', () => {
  const { banner, getBanner } = useBanner()
  const { services, getServices } = useServices()

  return {
    banner,
    getBanner,
    services,
    getServices
  }
})
