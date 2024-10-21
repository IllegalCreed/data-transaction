import { v4 as uuidv4 } from 'uuid'
import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import type { ILogin, ILoginCode, ILoginAd, IAuthLink } from '@/types/login'
import {
  code as mockCode,
  ads as mockAds,
  oauthLinks as mockLinks,
} from '@/constants/mockData/account/login'
import { loginAPI, getCodeAPI, getAdAPI } from '@/apis/account/login'

export const useLogin = () => {
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

  const getCode = (): Promise<ILoginCode> => {
    return new Promise<ILoginCode>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve({
          uuid: uuidv4(),
          img: mockCode,
        })
      } else {
        getCodeAPI()
          .then((res: unknown) => {
            resolve(res as ILoginCode)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getAd = (): Promise<ILoginAd> => {
    return new Promise<ILoginAd>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(mockAds), 1000)
      } else {
        getAdAPI()
          .then(res => {
            resolve(res as ILoginAd)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const links = ref<IAuthLink[]>([])

  const getLinks = (): Promise<void> => {
    return new Promise<void>(resolve => {
      links.value = mockLinks
      resolve()
    })
  }

  return { login, getCode, getAd, links, getLinks }
}
