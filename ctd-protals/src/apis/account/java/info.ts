import request from '@/axios'
import type { IIndividualUserInfo } from '@/types/register'

export const getInfo = (): Promise<unknown> => {
  return request.get(
    {
      url: '/getInfo',
    },
    true,
  )
}

export const editInfo = (userInfo: IIndividualUserInfo): Promise<unknown> => {
  const data = {
    ...userInfo,
  }
  return request.put(
    {
      url: '/system/user/profile',
      data,
    },
    true,
  )
}

export const uploadAvatar = (file: File): Promise<unknown> => {
  const data = {
    avatarfile: file,
  }
  return request.post(
    {
      url: '/system/user/profile/avatar',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}
