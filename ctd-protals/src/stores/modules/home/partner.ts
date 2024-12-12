import { useSettingsStore } from '@/stores/modules/settings'
import type { IPartner } from '@/types/home'
import {
  getTopPartner as getTopPartnerAPI,
  getPartner as getPartnerAPI,
} from '@/apis/home/java/partner'
import { partners as mockPartners } from '@/constants/mockData/home/partner'
import {
  partnerConvert,
  type IPartnerFetchData,
} from '@/apiConvert/home/partner'
import type { ICommonReturn } from '@/axios/type'

export const usePartners = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const partners = ref<IPartner[]>()

  const getPartners = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('首页')) {
        window.setTimeout(() => {
          partners.value = mockPartners.slice(0, 10)
          resolve()
        }, 1000)
      } else {
        getPartnerAPI()
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IPartnerFetchData[]>
              partners.value = partnerConvert(resData.data)
            } else {
              partners.value = res as IPartner[]
            }
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
      if (findMockTreeValueByKey('首页')) {
        window.setTimeout(() => {
          topPartners.value = mockPartners.slice(0, 2)
          resolve()
        }, 1000)
      } else {
        getTopPartnerAPI()
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IPartnerFetchData[]>
              topPartners.value = partnerConvert(resData.data)
            } else {
              topPartners.value = res as IPartner[]
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
    partners,
    getPartners,
    topPartners,
    getTopPartners,
  }
}
