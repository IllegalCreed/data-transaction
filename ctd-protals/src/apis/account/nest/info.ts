import request from '@/axios'

export const getInfo = (): Promise<unknown> => {
  return request.post(
    {
      url: '/login',
    },
    true,
  )
}

export const editInfo = (): Promise<unknown> => {
  return request.post(
    {
      url: '/login',
    },
    true,
  )
}
