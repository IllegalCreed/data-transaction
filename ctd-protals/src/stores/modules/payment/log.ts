import { useSettingsStore } from '@/stores/modules/settings'
import type { IPaymentLog } from '@/types/payment'
import { paymentLogs as mockPaymentLogs } from '@/constants/mockData/payment/payment'
import { getPaymentLogs as getPaymentLogsAPI } from '@/apis/payment/payment'

export const usePaymentLog = () => {
  const settingsStore = useSettingsStore()

  const paymentLogs = ref<IPaymentLog[]>([])

  const getPaymentLogs = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          paymentLogs.value = mockPaymentLogs
          resolve()
        }, 1000)
      } else {
        getPaymentLogsAPI()
          .then((res: unknown) => {
            paymentLogs.value = res as IPaymentLog[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    paymentLogs,
    getPaymentLogs,
  }
}
