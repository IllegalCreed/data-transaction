import request from '@/axios'

export const resetPwd = (oldPwd: string, newPwd: string): Promise<unknown> => {
  const params = {
    oldPassword: oldPwd,
    newPassword: newPwd,
  }
  return request.get(
    {
      url: '/user/resetPwd',
      params,
    },
    true,
  )
}

export const getSecurityInfo = (): Promise<unknown> => {
  const params = {}
  return request.get(
    {
      url: '/user/getSecurityInfo',
      params,
    },
    true,
  )
}
