import type { IRegisterAdCarouselItem } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import {
  sendVerificationCode as sendVerificationCodeAPI,
  verifyCode as verifyCodeAPI,
  resetPasswordByToken as resetPasswordByTokenAPI,
} from '@/apis/account'
import { ads as mockAds } from '@/constants/mockData/account/forgot'
import type { ICommonReturn } from '@/axios/type'

export const useForgot = () => {
  const settingsStore = useSettingsStore()

  const email = ref<string>()

  const setEmail = (value: string) => {
    email.value = value
  }

  const token = ref<string>()

  const setToken = (value: string) => {
    token.value = value
  }

  const sendEmail = (email: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        sendVerificationCodeAPI(email)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const verifyCode = (email: string, code: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve('mockToken'), 1000)
      } else {
        verifyCodeAPI(email, code)
          .then(res => {
            const resData = res as ICommonReturn<string>
            resolve(resData.data)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const resetPassword = (code: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        resetPasswordByTokenAPI(code, password)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getAds = (): Promise<IRegisterAdCarouselItem[]> => {
    return new Promise<IRegisterAdCarouselItem[]>(resolve => {
      resolve(mockAds)
    })
  }

  return {
    email,
    setEmail,
    token,
    setToken,
    sendEmail,
    verifyCode,
    resetPassword,
    getAds,
  }
}
