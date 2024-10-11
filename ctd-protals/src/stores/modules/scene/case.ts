import { useSettingsStore } from '@/stores/modules/settings'
import type { IScene } from '@/types/scene'
import { getCases as getCasesAPI, getScene as getSceneAPI } from '@/apis/scene/case'
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

  const getScene = (id: string | number): Promise<IScene> => {
    return new Promise<IScene>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const sceneDetail = mockCases.find((item) => item.id === Number(id))
          if (sceneDetail) {
            resolve(sceneDetail)
          } else {
            reject(new Error('Scene not found'))
          }
        }, 1000)
      } else {
        getSceneAPI(id)
          .then((res: unknown) => {
            const result = res as IScene
            resolve(result)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    cases,
    getCases,
    getScene
  }
}
