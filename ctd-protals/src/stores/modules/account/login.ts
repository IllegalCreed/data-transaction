import type { ILoginAd } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import { ads as mockAds, oauthLinks as mockLinks } from '@/constants/mockData/account/login'
import { getAdAPI } from '@/apis/account/login'
import type { IAuthLink } from '@/types/login'

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

  const links = ref<IAuthLink[]>([])

  const getLinks = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        links.value = mockLinks
        resolve()
      }, 1000)
    })
  }

  return { getAd, links, getLinks }
}
