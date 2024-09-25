import { defineStore } from 'pinia'
import type { IBanner } from '@/types/banner'
import type { IModule } from '@/types/home'
import { getBanners as getBannersAPI } from '@/apis/advertisement'
import { bannerList as mockBanners } from '@/constants/mockData/home/banner'
import { moduleList as mockModules } from '@/constants/mockData/home/module'

export const useHomeStore = defineStore('home', () => {
  const settingsStore = useSettingsStore()

  /**
   * 首页轮播图
   */
  const banners = ref<IBanner[]>()

  const getBanners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          banners.value = mockBanners
          resolve()
        }, 1000)
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

  /**
   * 首页模块介绍
   */
  const modules = ref<IModule[]>()

  const getModules = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      modules.value = mockModules
      resolve()
    })
  }

  return {
    banners,
    getBanners,
    modules,
    getModules
  }
})
