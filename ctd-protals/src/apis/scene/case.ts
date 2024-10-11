import request from '@/axios'

export const getCases = (): Promise<void> => {
  const params = {}
  return request.post(
    {
      url: '/getCases',
      params
    },
    false
  )
}

export const getScene = (id: number | string): Promise<void> => {
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
