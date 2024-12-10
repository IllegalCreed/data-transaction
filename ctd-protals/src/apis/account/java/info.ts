import request from '@/axios'

export const getInfo = (): Promise<unknown> => {
  return request.get(
    {
      url: '/getInfo',
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

export const uploadAvatar = (file: File): Promise<unknown> => {
  const data = {
    file,
  }
  return request.put(
    {
      url: '/common/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}
