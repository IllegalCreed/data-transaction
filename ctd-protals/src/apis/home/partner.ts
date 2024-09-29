import request from '@/axios'

export const getTopPartner = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getTopPartner',
      params
    },
    false
  )
}

export const getPartner = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getPartner',
      params
    },
    false
  )
}
