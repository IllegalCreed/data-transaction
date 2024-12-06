import { useSettingsStore } from '../settings'
import type { IApprovalLog, IRejectReason } from '@/types/approval'
import {
  getProductRejectReason as getProductRejectReasonAPI,
  getProductApprovalLogs as getProductApprovalLogsAPI
} from '@/apis/product'
import {
  reason as mockReason,
  approvalLogs as mockApprovalLogs
} from '@/constants/mockData/product/approval'

export const useApproval = () => {
  const settingsStore = useSettingsStore()

  const getProductRejectReason = (reasonId: string | number): Promise<IRejectReason> => {
    return new Promise<IRejectReason>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockReason)
        }, 1000)
      } else {
        getProductRejectReasonAPI(reasonId)
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

  const getProductApprovalLogs = (productId: string | number): Promise<IApprovalLog[]> => {
    return new Promise<IApprovalLog[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockApprovalLogs)
        }, 1000)
      } else {
        getProductApprovalLogsAPI(productId)
          .then((res) => {
            const result = res as IApprovalLog[]
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
    getProductRejectReason,
    getProductApprovalLogs
  }
}
