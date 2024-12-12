import request from '@/axios'

export const getTopPartner = (): Promise<unknown> => {
  const params = {
    bizCooperativePartner: 2,
  }
  return request.get(
    {
      url: '/api/c/common/listCompany',
      params,
    },
    false,
  )
}

export const getPartner = (): Promise<unknown> => {
  const params = {
    bizCooperativePartner: 1,
  }
  return request.get(
    {
      url: '/api/c/common/listCompany',
      params,
    },
    false,
  )
}
