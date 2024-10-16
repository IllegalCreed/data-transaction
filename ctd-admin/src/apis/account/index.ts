import request from '@/axios'
import type { ILogin } from '@/types/Login'

export const loginAPI = (login: ILogin): Promise<any> => {
  const data = {
    username: login.account,
    password: login.password,
    code: login.code,
    uuid: login.uuid
  }
  return request.post(
    {
      url: '/login',
      data
    },
    false
  )
}

export const logoutAPI = (): Promise<any> => {
  return request.post({ url: '/logout' })
}

export const getCodeAPI = (): Promise<any> => {
  return request.get({ url: '/captchaImage' })
}

// 修改管理员密码
export const resetPwdAPI = (oldPwd: string, newPwd: string): Promise<any> => {
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
