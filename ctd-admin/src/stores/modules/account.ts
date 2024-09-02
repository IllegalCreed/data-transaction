import { logoutAPI, loginAPI, getCodeAPI, resetPwdAPI } from '@/apis/account'
import type { ILogin } from '@/types/Login'
import { useTokenStore } from './token'

export const useAccountStore = defineStore('account', () => {
  const tokenStore = useTokenStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      loginAPI(login)
        .then((res: any) => {
          tokenStore.setToken(res.token)

          if (res.warning === 1) {
            ElNotification({
              title: '密码过期',
              message: '超过三个月未修改密码，请及时修改',
              type: 'warning',
              duration: 0
            })
          }
          resolve()
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      logoutAPI()
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          tokenStore.clearToken()
        })
    })
  }

  const getCode = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getCodeAPI()
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {})
    })
  }

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      resetPwdAPI(oldPwd, newPwd)
        .then(() => {
          resolve()
          tokenStore.clearToken()
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {})
    })
  }

  return { login, logout, getCode, resetPwd }
})
