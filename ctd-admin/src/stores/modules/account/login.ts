import { v4 as uuidv4 } from 'uuid'
import { useSettingsStore } from '../settings'
import { useTokenStore } from '../token'
import type { ILogin, ICaptcha } from '@/types/login'
import { login as loginAPI, getCaptcha as getCaptchaAPI } from '@/apis/account'
import { code as mockCode, token as mockToken } from '@/constants/mockData/account/login'
import type { ICommonReturn } from '@/types/common'

export const useLogin = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('login')) {
        tokenStore.setToken(mockToken)
        resolve()
      } else {
        loginAPI(login)
          .then((res: unknown) => {
            const result = res as ICommonReturn<{ token: string }>
            tokenStore.setToken(result.data.token)
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getCaptcha = (): Promise<ICaptcha> => {
    return new Promise<ICaptcha>((resolve, reject) => {
      if (findMockTreeValueByKey('login')) {
        resolve({
          id: uuidv4(),
          data: mockCode
        })
      } else {
        getCaptchaAPI()
          .then((res: unknown) => {
            const resData = res as ICommonReturn<ICaptcha>
            resolve(resData.data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      tokenStore.clearToken()
      resolve()
    })
  }

  return { login, getCaptcha, logout }
}
