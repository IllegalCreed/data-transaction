import { useSettingsStore } from '@/stores/modules/settings'
import type { IScene } from '@/types/scene'
import { getCases as getCasesAPI, getScene as getSceneAPI } from '@/apis/scene'
import { cases as mockCases } from '@/constants/mockData/scene/case'
import type { ICommonReturn } from '@/axios/type'
import {
  sceneConvert,
  scenesConvert,
  type ISceneFetchData,
} from '@/apiConvert/scene/case'

export const useCases = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const cases = ref<IScene[]>()

  const getCases = (pageNum: number, pageSize: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('场景')) {
        window.setTimeout(() => {
          cases.value = mockCases
          resolve()
        }, 1000)
      } else {
        getCasesAPI(pageNum, pageSize)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<ISceneFetchData>
              cases.value = scenesConvert(resData.rows!)
            } else {
              cases.value = res as IScene[]
            }
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
      if (findMockTreeValueByKey('场景')) {
        window.setTimeout(() => {
          const sceneDetail = mockCases.find(item => item.id === Number(id))
          if (sceneDetail) {
            resolve(sceneDetail)
          } else {
            reject(new Error('Scene not found'))
          }
        }, 1000)
      } else {
        getSceneAPI(id)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<ISceneFetchData>
              resolve(sceneConvert(resData.data!))
            } else {
              const result = res as IScene
              resolve(result)
            }
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
    getScene,
  }
}
