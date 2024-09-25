import { defineStore } from 'pinia'
import type { IBanner } from '@/types/banner'
import { getBanners as getBannersAPI } from '@/apis/advertisement'
import { bannerList as mockBanners } from '@/constants/mockData/banner'

export const useHomeStore = defineStore('home', () => {
  const settingsStore = useSettingsStore()

  const banners = ref<IBanner[]>()

  const getBanners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        banners.value = mockBanners
        resolve()
      } else {
        getBannersAPI()
          .then((res: unknown) => {
            banners.value = res as IBanner[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    banners,
    getBanners
  }
})
