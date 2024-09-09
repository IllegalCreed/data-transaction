import { logoutAPI, loginAPI, getCodeAPI, resetPwdAPI } from '@/apis/account'
import type { ILogin } from '@/types/login'
import { useTokenStore } from './token'

export const useAccountStore = defineStore('account', () => {
  const tokenStore = useTokenStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      loginAPI(login)
        .then((res: any) => {
          tokenStore.setToken(res.token)
          resolve()
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // logoutAPI()
      //   .then(() => {
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
      //   .finally(() => {
      //     tokenStore.clearToken()
      //   })
      tokenStore.clearToken()
      resolve()
    })
  }

  const getCode = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // getCodeAPI()
      //   .then((res) => {
      //     resolve(res)
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
      //   .finally(() => {})
      resolve()
    })
  }

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      resetPwdAPI(oldPwd, newPwd)
        .then(() => {
          resolve()
          tokenStore.clearToken()
        })
        .catch((error: Error) => {
          reject(error)
        })
        .finally(() => {})
    })
  }

  return { login, logout, getCode, resetPwd }
})
