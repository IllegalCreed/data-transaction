import request from '@/axios'

export const getCases = (): Promise<unknown> => {
  const params = {}
  return request.post(
    {
      url: '/getCases',
      params
    },
    false
  )
}

export const getScene = (id: number | string): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: `/getScene/${id}`,
      params
    },
    false
  )
}
