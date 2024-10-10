import { useSettingsStore } from '@/stores/modules/settings'
import type { IScene } from '@/types/scene'
import { getCases as getCasesAPI } from '@/apis/scene/case'
import { cases as mockCases } from '@/constants/mockData/scene/case'

export const useCases = () => {
  const settingsStore = useSettingsStore()

  const cases = ref<IScene[]>()

  const getCases = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          cases.value = mockCases
          resolve()
        }, 1000)
      } else {
        getCasesAPI()
          .then((res: unknown) => {
            cases.value = res as IScene[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    cases,
    getCases
  }
}
