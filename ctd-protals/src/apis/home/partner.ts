import request from '@/axios'

export const getTopPartner = (): Promise<void> => {
  const params = {
    pageNum: 1,
    pageSize: 0,
    noticeType: 5
  }
  return request.get(
    {
      url: '/api/t/common/listNotice',
      params
    },
    false
  )
}

export const getPartner = (): Promise<void> => {
  const params = {
    pageNum: 1,
    pageSize: 8,
    noticeType: 4
  }
  return request.get(
    {
      url: '/api/t/common/listNotice',
      params
    },
    false
  )
}
