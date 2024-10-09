import { useSettingsStore } from '@/stores/modules/settings'
import type { IDemand } from '@/types/demand'
import { getDemands as getDemandsAPI } from '@/apis/demand/demand'
import { demands as mockDemands } from '@/constants/mockData/demand/demand'

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

  return {
    demands,
    getDemands
  }
}
