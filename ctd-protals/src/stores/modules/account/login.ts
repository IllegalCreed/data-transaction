import type { ILoginAd } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import { ads as mockAds } from '@/constants/mockData/account/login'
import { getAdAPI } from '@/apis/account/login'

export const useLogin = () => {
  const settingsStore = useSettingsStore()

  const getAd = (): Promise<ILoginAd> => {
    return new Promise<ILoginAd>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(mockAds), 1000)
      } else {
        getAdAPI()
          .then((res) => {
            resolve(res as ILoginAd)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return { getAd }
}
