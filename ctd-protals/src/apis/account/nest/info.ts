import request from '@/axios'
import { omit } from 'lodash-es'
import type { IIndividualUserInfo } from '@/types/register'

export const getInfo = (): Promise<unknown> => {
  return request.get(
    {
      url: '/user/info',
    },
    true,
  )
}

export const editInfo = (userInfo: IIndividualUserInfo): Promise<unknown> => {
  const individualInfo = omit(userInfo, ['avatarUrl'])
  const data = {
    ...individualInfo,
  }
  return request.put(
    {
      url: '/user/individual',
      data,
    },
    true,
  )
}

export const uploadAvatar = (file: File): Promise<unknown> => {
  const data = {
    avatar: file,
  }
  return request.patch(
    {
      url: '/user/avatar',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    },
    true,
  )
}
