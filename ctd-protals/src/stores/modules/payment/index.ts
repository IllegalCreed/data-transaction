import { defineStore } from 'pinia'
import { usePaymentLog } from './log'

export const usePaymentStore = defineStore('payment', () => {
  const { paymentLogs, getPaymentLogs } = usePaymentLog()

  return {
    paymentLogs,
    getPaymentLogs,
  }
})
