import request from '@/axios'

export const getPaymentLogs = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getPaymentLogs',
      params,
    },
    false,
  )
}
