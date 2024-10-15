import { v4 as uuidv4 } from 'uuid'
import type { ILogin, ILoginCode } from '@/types/login'
import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import { logoutAPI, loginAPI, getCodeAPI, resetPwdAPI } from '@/apis/account/account'
import { code as mockCode } from '@/constants/mockData/account/account'

export const useAccount = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        tokenStore.setToken('testToken')
        resolve()
      } else {
        loginAPI(login)
          .then((res: unknown) => {
            const result = res as { token: string }
            tokenStore.setToken(result.token)
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        tokenStore.clearToken()
        resolve()
      } else {
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
      }
    })
  }

  const getCode = (): Promise<ILoginCode> => {
    return new Promise<ILoginCode>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve({
          uuid: uuidv4(),
          img: mockCode
        })
      } else {
        getCodeAPI()
          .then((res: unknown) => {
            resolve(res as ILoginCode)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve()
        tokenStore.clearToken()
      } else {
        resetPwdAPI(oldPwd, newPwd)
          .then(() => {
            resolve()
            tokenStore.clearToken()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return { login, logout, getCode, resetPwd }
}
