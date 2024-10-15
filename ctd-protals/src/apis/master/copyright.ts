import request from '@/axios'

export const getCopyright = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/getCopyright',
      params
    },
    false
  )
}
