import request from '@/axios'

export const getCopyright = (): Promise<void> => {
  const params = {}
  return request.get(
    {
      url: '/getCopyright',
      params
    },
    false
  )
}
