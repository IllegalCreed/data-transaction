import request from '@/axios'
import type { UserInfo } from '@/types/account'

export const getInfo = (): Promise<unknown> => {
  return request.get(
    {
      url: '/user/info',
    },
    true,
  )
}

export const editInfo = (userInfo: UserInfo): Promise<unknown> => {
  const data = {
    ...userInfo,
  }
  return request.put(
    {
      url: '/api/prv/user/edit',
      data,
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
