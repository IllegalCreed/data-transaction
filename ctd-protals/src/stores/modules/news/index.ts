import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/modules/settings'
import type { INews, INewsItem } from '@/types/news'
import { getNewsList as getNewsListAPI, getNews as getNewsAPI } from '@/apis/news'
import {
  newsList as mockNewsList,
  newsDetails as mockNewsDetails
} from '@/constants/mockData/home/news'

export const useNewsStore = defineStore('news', () => {
  const settingsStore = useSettingsStore()

  /**
   * 新闻列表
   */
  const newsList = ref<INewsItem[]>()

  const getNewsList = (pageNum: number, pageSize: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          newsList.value = mockNewsList
          resolve()
        }, 1000)
      } else {
        getNewsListAPI(pageNum, pageSize)
          .then((res: unknown) => {
            newsList.value = res as INewsItem[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getNews = (id: string | number): Promise<INews> => {
    return new Promise<INews>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const sceneDetail = mockNewsDetails.find((item) => item.id === Number(id))
          if (sceneDetail) {
            resolve(sceneDetail)
          } else {
            reject(new Error('News not found'))
          }
        }, 1000)
      } else {
        getNewsAPI(id)
          .then((res: unknown) => {
            const result = res as INews
            resolve(result)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    newsList,
    getNewsList,
    getNews
  }
})
