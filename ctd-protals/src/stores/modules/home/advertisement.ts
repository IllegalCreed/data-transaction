import type { IHomeAd } from '@/types/home'
import { ads as mockAds } from '@/constants/mockData/home/advertisement'

export const useAds = () => {
  const ads = ref<IHomeAd[]>()

  const getAds = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      ads.value = mockAds
      resolve()
    })
  }

  return {
    ads,
    getAds
  }
}
