import { v4 as uuidv4 } from 'uuid'
import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import type { ILogin, ILoginAd, IAuthLink, ICaptcha } from '@/types/login'
import {
  code as mockCode,
  ads as mockAds,
  oauthLinks as mockLinks,
} from '@/constants/mockData/account/login'
import {
  login as loginAPI,
  getCaptcha as getCaptchaAPI,
  checkCaptcha as checkCaptchaAPI,
} from '@/apis/account'
import type { ICommonReturn } from '@/axios/type'

export const useLogin = () => {
  const tokenStore = useTokenStore()
  const { findMockTreeValueByKey } = useSettingsStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('登录')) {
        tokenStore.setToken('testToken')
        resolve()
      } else {
        loginAPI(login)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const result = res as { token: string }
              tokenStore.setToken(result.token)
            } else {
              const result = res as ICommonReturn<{ token: string }>
              tokenStore.setToken(result.data.token)
            }
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
      if (findMockTreeValueByKey('登录')) {
        resolve({
          id: uuidv4(),
          data: mockCode,
        })
      } else {
        getCaptchaAPI()
          .then((res: unknown) => {
            const resData = res as ICommonReturn<ICaptcha>
            resolve(resData.data)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const checkCaptcha = (email: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      if (findMockTreeValueByKey('登录')) {
        resolve(false)
      } else {
        checkCaptchaAPI(email)
          .then((res: unknown) => {
            const resData = res as ICommonReturn<boolean>
            resolve(resData.data)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getAd = (): Promise<ILoginAd> => {
    return new Promise<ILoginAd>(resolve => {
      resolve(mockAds)
    })
  }

  const links = ref<IAuthLink[]>([])

  const getLinks = (): Promise<void> => {
    return new Promise<void>(resolve => {
      links.value = mockLinks
      resolve()
    })
  }

  return { login, getCaptcha, checkCaptcha, getAd, links, getLinks }
}
