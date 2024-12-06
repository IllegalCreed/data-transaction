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
