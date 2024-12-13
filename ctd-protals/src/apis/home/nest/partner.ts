import request from '@/axios'

export const getTopPartner = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/api/t/common/listNotice',
      params,
    },
    false,
  )
}

export const getPartner = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/api/t/common/listNotice',
      params,
    },
    false,
  )
}
