import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult, IOption } from '@/types/common'
import type { IScene, ISceneDTO, ISceneItem } from '@/types/scene'
import {
  getScenes as getScenesAPI,
  getScene as getSceneAPI,
  upsertScene as upsertSceneAPI,
  changeScenesStatus as changeScenesStatusAPI,
  deleteScenes as deleteScenesAPI,
  getSceneOptionsByName as getSceneOptionsByNameAPI,
  getSceneOptionsByID as getSceneOptionsByIDAPI
} from '@/apis/scene'
import { scenes as mockScenes, sceneOptions as mockSceneOptions } from '@/constants/mockData/scene'
import type { ActiveStatus } from '@/constants/mapData'

export const useSceneStore = defineStore('scene', () => {
  const settingsStore = useSettingsStore()

  const getScenes = (
    searchQuery: string,
    status: ActiveStatus | null,
    isOuterLink: boolean | null,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<ISceneItem>> => {
    return new Promise<apiListResult<ISceneItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockScenes.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const isOuterLinkMatch = isOuterLink !== null ? item.isOuterLink === isOuterLink : true
            const searchMatch = searchQuery ? item.title.includes(searchQuery) : true

            return statusMatch && searchMatch && isOuterLinkMatch
          })
          const newArray: ISceneItem[] = result.map((item) => ({
            ...item,
            companyName: item.company.name
          }))
          resolve({ total: result.length, rows: newArray })
        }, 1000)
      } else {
        getScenesAPI(searchQuery, status, isOuterLink, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<ISceneItem>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getScene = (id: string | number): Promise<IScene> => {
    return new Promise<IScene>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockScenes.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Scene not found'))
          }
        }, 1000)
      } else {
        getSceneAPI(id)
          .then((res) => {
            const result = res as IScene
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const upsertScene = (id: string | number, sceneInfo: ISceneDTO): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        upsertSceneAPI(id, sceneInfo)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const changeScenesStatus = (ids: (string | number)[], status: ActiveStatus): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        changeScenesStatusAPI(ids, status)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const deleteScenes = (ids: (string | number)[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        deleteScenesAPI(ids)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getSceneOptionsByName = (searchQuery: string): Promise<IOption[]> => {
    return new Promise<IOption[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockSceneOptions)
        }, 1000)
      } else {
        getSceneOptionsByNameAPI(searchQuery)
          .then((res) => {
            const result = res as IOption[]
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getSceneOptionsByID = (id: string | number): Promise<IOption> => {
    return new Promise<IOption>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockSceneOptions.find((item) => item.value === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Scene not found'))
          }
        }, 1000)
      } else {
        getSceneOptionsByIDAPI(id)
          .then((res) => {
            const result = res as IOption
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getScenes,
    getScene,
    upsertScene,
    changeScenesStatus,
    deleteScenes,
    getSceneOptionsByName,
    getSceneOptionsByID
  }
})
