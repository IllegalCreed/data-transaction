import { useSettingsStore } from '@/stores/modules/settings'
import type { IScene } from '@/types/scene'
import { getPrimaryCases as getPrimaryCasesAPI } from '@/apis/scene/primary'
import { primaryCases as mockPrimaryCases } from '@/constants/mockData/scene/primary'

export const usePrimaryCases = () => {
  const settingsStore = useSettingsStore()

  const primaryCases = ref<IScene[]>()

  const getPrimaryCases = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          primaryCases.value = mockPrimaryCases
          resolve()
        }, 1000)
      } else {
        getPrimaryCasesAPI()
          .then((res: unknown) => {
            primaryCases.value = res as IScene[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    primaryCases,
    getPrimaryCases
  }
}
