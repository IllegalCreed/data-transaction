import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/modules/settings'
import type { INewsItem } from '@/types/news'
import { getNewsList as getNewsListAPI } from '@/apis/news'
import { newsList as mockNewsList } from '@/constants/mockData/home/news'

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

  return {
    newsList,
    getNewsList
  }
})
