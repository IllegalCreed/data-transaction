import { useSettingsStore } from '@/stores/modules/settings'
import type { IPartner } from '@/types/home'
import { getTopPartner as getTopPartnerAPI, getPartner as getPartnerAPI } from '@/apis/home/partner'
import { partners as mockPartners } from '@/constants/mockData/home/partner'
import { partnerConvert } from '@/apiConvert/home/partner'

export const usePartners = () => {
  const settingsStore = useSettingsStore()

  const partners = ref<IPartner[]>()

  const getPartners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          partners.value = mockPartners.slice(0, 10)
          resolve()
        }, 1000)
      } else {
        getPartnerAPI()
          .then((res: unknown) => {
            partners.value = partnerConvert(res)
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const topPartners = ref<IPartner[]>()

  const getTopPartners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          // topPartners.value = mockPartners.slice(0, 2)
          resolve()
        }, 1000)
      } else {
        getTopPartnerAPI()
          .then((res: unknown) => {
            topPartners.value = res as IPartner[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    partners,
    getPartners,
    topPartners,
    getTopPartners
  }
}
