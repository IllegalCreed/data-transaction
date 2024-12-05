import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult } from '@/types/common'
import type { INews, INewsDTO, INewsItem } from '@/types/news'
import {
  getNews as getNewsAPI,
  getNewsDetail as getNewsDetailAPI,
  upsertNews as upsertNewsAPI,
  changeNewsStatus as changeNewsStatusAPI,
  deleteNews as deleteNewsAPI
} from '@/apis/news'
import { news as mockNews } from '@/constants/mockData/news'
import type { ActiveStatus } from '@/constants/mapData'

export const useNewsStore = defineStore('news', () => {
  const settingsStore = useSettingsStore()

  const getNews = (
    searchQuery: string,
    status: ActiveStatus,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<INewsItem>> => {
    return new Promise<apiListResult<INewsItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockNews.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const searchMatch = searchQuery ? item.title.includes(searchQuery) : true

            return statusMatch && searchMatch
          })
          resolve({ total: result.length, rows: result })
        }, 1000)
      } else {
        getNewsAPI(searchQuery, status, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<INewsItem>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getNewsDetail = (id: string | number): Promise<INews> => {
    return new Promise<INews>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockNews.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('News not found'))
          }
        }, 1000)
      } else {
        getNewsDetailAPI(id)
          .then((res) => {
            const result = res as INews
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const upsertNews = (id: string | number, newsInfo: INewsDTO): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        upsertNewsAPI(id, newsInfo)
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

  const changeNewsStatus = (ids: (string | number)[], status: ActiveStatus): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        changeNewsStatusAPI(ids, status)
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

  const deleteNews = (ids: (string | number)[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        deleteNewsAPI(ids)
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

  return {
    getNews,
    getNewsDetail,
    upsertNews,
    changeNewsStatus,
    deleteNews
  }
})
