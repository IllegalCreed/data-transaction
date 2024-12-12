import { useSettingsStore } from '@/stores/modules/settings'
import type { IBanner } from '@/types/home'
import { getBanners as getBannersAPI } from '@/apis/home/java/banner'
import { bannerList as mockBanners } from '@/constants/mockData/home/banner'
import type { ICommonReturn } from '@/axios/type'
import { bannerConvert, type IBannerFetchData } from '@/apiConvert/home/banner'

export const useBanners = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const banners = ref<IBanner[]>()

  const getBanners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('首页')) {
        window.setTimeout(() => {
          banners.value = mockBanners
          resolve()
        }, 1000)
      } else {
        getBannersAPI()
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IBannerFetchData[]>
              banners.value = bannerConvert(resData.data)
            } else {
              banners.value = res as IBanner[]
            }

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
    getBanners,
  }
}
