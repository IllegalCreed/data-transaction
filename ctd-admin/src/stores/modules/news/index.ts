import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult, ICommonReturn, IOption } from '@/types/common'
import type { INews, INewsDTO, INewsItem } from '@/types/news'
import {
  getNewsList as getNewsListAPI,
  getNewsDetail as getNewsDetailAPI,
  upsertNews as upsertNewsAPI,
  changeNewsStatus as changeNewsStatusAPI,
  deleteNews as deleteNewsAPI,
  getNewsOptionsByTitle as getNewsOptionsByTitleAPI,
  getNewsOptionsByID as getNewsOptionsByIDAPI
} from '@/apis/news'
import { news as mockNews, newsOptions as mockNewsOptions } from '@/constants/mockData/news'
import type { ActiveStatus } from '@/constants/mapData'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const useNewsStore = defineStore('news', () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const getNewsList = (
    searchQuery: string,
    filters: IFilterDTO<INewsItem>[],
    sorts: ISort<INewsItem>[],
    columns: ITableColumnDTO<INewsItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<ICommonReturn<apiListResult<INewsItem>>> => {
    return new Promise<ICommonReturn<apiListResult<INewsItem>>>((resolve, reject) => {
      if (findMockTreeValueByKey('news')) {
        window.setTimeout(() => {
          const result = mockNews.filter((item) => {
            const searchMatch = searchQuery ? item.title.includes(searchQuery) : true

            return searchMatch
          })
          resolve({ data: { total: result.length, rows: result }, code: 0, msg: 'success' })
        }, 1000)
      } else {
        getNewsListAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as ICommonReturn<apiListResult<INewsItem>>
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
      if (findMockTreeValueByKey('news')) {
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
            const result = res as ICommonReturn<INews>
            resolve(result.data)
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
      if (findMockTreeValueByKey('news')) {
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
      if (findMockTreeValueByKey('news')) {
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
      if (findMockTreeValueByKey('news')) {
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

  const getNewsOptionsByTitle = (searchQuery: string): Promise<IOption[]> => {
    return new Promise<IOption[]>((resolve, reject) => {
      if (findMockTreeValueByKey('news')) {
        window.setTimeout(() => {
          resolve(mockNewsOptions)
        }, 1000)
      } else {
        getNewsOptionsByTitleAPI(searchQuery)
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

  const getNewsOptionsByID = (id: string | number): Promise<IOption> => {
    return new Promise<IOption>((resolve, reject) => {
      if (findMockTreeValueByKey('news')) {
        window.setTimeout(() => {
          const result = mockNewsOptions.find((item) => item.value === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('News not found'))
          }
        }, 1000)
      } else {
        getNewsOptionsByIDAPI(id)
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
    getNewsList,
    getNewsDetail,
    upsertNews,
    changeNewsStatus,
    deleteNews,
    getNewsOptionsByTitle,
    getNewsOptionsByID
  }
})
