import { v4 as uuidv4 } from 'uuid'
import { useSettingsStore } from '../settings'
import { useTokenStore } from '../token'
import type { ILogin, ILoginCode } from '@/types/login'
import { login as loginAPI, getCode as getCodeAPI, logout as logoutAPI } from '@/apis/account'
import { code as mockCode, token as mockToken } from '@/constants/mockData/account/login'

export const useLogin = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        tokenStore.setToken(mockToken)
        resolve()
      } else {
        loginAPI(login)
          .then((res: unknown) => {
            const result = res as { token: string; warning?: number }
            tokenStore.setToken(result.token)

            if (result.warning === 1) {
              ElNotification({
                title: '密码过期',
                message: '超过三个月未修改密码，请及时修改',
                type: 'warning',
                duration: 0
              })
            }

            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
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

  return { login, getCode, logout }
}
