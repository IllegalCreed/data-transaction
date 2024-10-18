import type { IRegisterAdCarouselItem } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import { getForgotAdsAPI } from '@/apis/account/forgot'
import { ads as mockAds } from '@/constants/mockData/account/forgot'

export const useForgot = () => {
  const settingsStore = useSettingsStore()

  const getAds = (): Promise<IRegisterAdCarouselItem[]> => {
    return new Promise<IRegisterAdCarouselItem[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(mockAds), 1000)
      } else {
        getForgotAdsAPI()
          .then((res) => {
            resolve(res as IRegisterAdCarouselItem[])
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getAds
  }
}
