import request from '@/axios'

export const resetPwd = (oldPwd: string, newPwd: string): Promise<unknown> => {
  const data = {
    oldPassword: oldPwd,
    newPassword: newPwd
  }
  return request.put(
    {
      url: '/platform/admin/update-password',
      data
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
