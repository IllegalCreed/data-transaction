import { useSettingsStore } from '../settings'
import type { IRejectReason } from '@/types/approval'
import { getLastRejectReason as getLastRejectReasonAPI } from '@/apis/product'
import { lastReason as mockLastReason } from '@/constants/mockData/product/approval'

export const useApproval = () => {
  const settingsStore = useSettingsStore()

  const getLastRejectReason = (productId: string | number): Promise<IRejectReason> => {
    return new Promise<IRejectReason>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockLastReason)
        }, 1000)
      } else {
        getLastRejectReasonAPI(productId)
          .then((res) => {
            const result = res as IRejectReason
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getLastRejectReason
  }
}
