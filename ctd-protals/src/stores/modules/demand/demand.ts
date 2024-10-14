import { useSettingsStore } from '@/stores/modules/settings'
import type { IDemand, IDemandBaseInfo } from '@/types/demand'
import {
  getDemands as getDemandsAPI,
  getDemand as getDemandAPI,
  getRecommendDemands as getRecommendDemandsAPI
} from '@/apis/demand/demand'
import {
  demands as mockDemands,
  demandDetails as mockDemandDetails
} from '@/constants/mockData/demand/demand'

export const useDemand = () => {
  const settingsStore = useSettingsStore()

  const demands = ref<IDemand[]>([])

  const getDemands = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          demands.value = mockDemands
          resolve()
        }, 1000)
      } else {
        getDemandsAPI()
          .then((res: unknown) => {
            demands.value = res as IDemand[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getDemand = (id: string | number): Promise<IDemandBaseInfo> => {
    return new Promise<IDemandBaseInfo>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const demandDetail = mockDemandDetails.find((item) => item.id === Number(id))
          if (demandDetail) {
            resolve(demandDetail?.baseInfo)
          } else {
            reject(new Error('Demand not found'))
          }
        }, 1000)
      } else {
        getDemandAPI(id)
          .then((res: unknown) => {
            const product = res as IDemandBaseInfo
            resolve(product)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getRecommendDemands = (id: string | number): Promise<IDemand[]> => {
    return new Promise<IDemand[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const recommendProducts =
            mockDemands.length >= 6 ? mockDemands.slice(0, 6) : [...mockDemands]
          if (recommendProducts) {
            resolve(recommendProducts)
          } else {
            reject(new Error('Demands not found'))
          }
        }, 1000)
      } else {
        getRecommendDemandsAPI(id)
          .then((res: unknown) => {
            const recommendProducts = res as IDemand[]
            resolve(recommendProducts)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    demands,
    getDemands,
    getDemand,
    getRecommendDemands
  }
}
