import request from '@/axios'
import type { UserStatus } from '@/constants/mapData/user'

export const changeUsersStatus = (
  ids: (string | number)[],
  status: UserStatus
): Promise<unknown> => {
  const data = {
    ids,
    status
  }
  return request.put(
    {
      url: '/user/change-status',
      data
    },
    true
  )
}

export const deleteUsers = (ids: (string | number)[]): Promise<unknown> => {
  const params = {
    ids
  }
  return request.delete(
    {
      url: '/user/delete',
      params
    },
    true
  )
}
