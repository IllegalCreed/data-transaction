import request from '@/axios'

export const resetPwd = (oldPwd: string, newPwd: string): Promise<unknown> => {
  const params = {
    oldPassword: oldPwd,
    newPassword: newPwd
  }
  return request.get(
    {
      url: '/user/resetPwd',
      params
    },
    true
  )
}

export const getAdminName = (): Promise<unknown> => {
  return request.get(
    {
      url: '/platform/admin/name'
    },
    true
  )
}
