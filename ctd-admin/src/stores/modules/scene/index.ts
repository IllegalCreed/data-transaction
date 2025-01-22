import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult, ICommonReturn, IOption } from '@/types/common'
import type { IScene, ISceneDTO, ISceneItem } from '@/types/scene'
import {
  getScenes as getScenesAPI,
  getScene as getSceneAPI,
  upsertScene as upsertSceneAPI,
  changeScenesStatus as changeScenesStatusAPI,
  deleteScenes as deleteScenesAPI,
  getSceneOptionsByTitle as getSceneOptionsByTitleAPI,
  getSceneOptionsByID as getSceneOptionsByIDAPI
} from '@/apis/scene'
import { scenes as mockScenes, sceneOptions as mockSceneOptions } from '@/constants/mockData/scene'
import type { ActiveStatus } from '@/constants/mapData'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const useSceneStore = defineStore('scene', () => {
  const settingsStore = useSettingsStore()

  const getScenes = (
    searchQuery: string,
    filters: IFilterDTO<ISceneItem>[],
    sorts: ISort<ISceneItem>[],
    columns: ITableColumnDTO<ISceneItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<ICommonReturn<apiListResult<ISceneItem>>> => {
    return new Promise<ICommonReturn<apiListResult<ISceneItem>>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockScenes.filter((item) => {
            const searchMatch = searchQuery ? item.title.includes(searchQuery) : true

            return searchMatch
          })
          const newArray: ISceneItem[] = result.map((item) => ({
            ...item,
            companyName: item.company?.label
          }))
          resolve({ data: { total: result.length, rows: newArray }, code: 0, msg: 'success' })
        }, 1000)
      } else {
        getScenesAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as ICommonReturn<apiListResult<ISceneItem>>
            result.data.rows.forEach((item) => {
              if (item.coverImageUrl) {
                if (import.meta.env.VITE_BACK_TYPE === 'nest') {
                  item.coverImageUrl = `${import.meta.env.VITE_NEST_SERVER_URL}${item.coverImageUrl}`
                } else if (import.meta.env.VITE_BACK_TYPE === 'java') {
                  item.coverImageUrl = `${import.meta.env.VITE_JAVA_SERVER_URL}${item.coverImageUrl}`
                }
              }
            })
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
            const result = res as ICommonReturn<IScene>
            if (result.data.coverImageUrl) {
              if (import.meta.env.VITE_BACK_TYPE === 'nest') {
                result.data.coverImageUrl = `${import.meta.env.VITE_NEST_SERVER_URL}${result.data.coverImageUrl}`
              } else if (import.meta.env.VITE_BACK_TYPE === 'java') {
                result.data.coverImageUrl = `${import.meta.env.VITE_JAVA_SERVER_URL}${result.data.coverImageUrl}`
              }
            }
            if (result.data.headerImageUrl) {
              if (import.meta.env.VITE_BACK_TYPE === 'nest') {
                result.data.headerImageUrl = `${import.meta.env.VITE_NEST_SERVER_URL}${result.data.headerImageUrl}`
              } else if (import.meta.env.VITE_BACK_TYPE === 'java') {
                result.data.headerImageUrl = `${import.meta.env.VITE_JAVA_SERVER_URL}${result.data.headerImageUrl}`
              }
            }

            resolve(result.data)
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

  const getSceneOptionsByTitle = (searchQuery: string): Promise<IOption[]> => {
    return new Promise<IOption[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockSceneOptions)
        }, 1000)
      } else {
        getSceneOptionsByTitleAPI(searchQuery)
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
    getSceneOptionsByTitle,
    getSceneOptionsByID
  }
})
