import type { IService } from '@/types/consult'
import { services as mockServices } from '@/constants/mockData/consult/service'

export const useServices = () => {
  const services = ref<IService[]>()

  const getServices = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      services.value = mockServices
      resolve()
    })
  }

  return {
    services,
    getServices
  }
}
