import request from '@/axios'

export const logoutAPI = (): Promise<unknown> => {
  return request.post({ url: '/logout' })
}

export const resetPwdAPI = (
  oldPwd: string,
  newPwd: string,
): Promise<unknown> => {
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

export const getInfoAPI = (): Promise<unknown> => {
  return request.get({ url: '/getInfoAPI' })
}
