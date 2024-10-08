import { useSettingsStore } from '@/stores/modules/settings'
import type { IBanner } from '@/types/home'
import { getBanners as getBannersAPI } from '@/apis/home/banner'
import { bannerList as mockBanners } from '@/constants/mockData/home/banner'

export const useBanners = () => {
  const settingsStore = useSettingsStore()

  const banners = ref<IBanner[]>()

  const getBanners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          banners.value = mockBanners
          resolve()
        }, 1000)
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
}
