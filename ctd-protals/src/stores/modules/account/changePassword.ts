import { useSettingsStore } from '../settings'
import {
  sendVerificationCodeAuth as sendVerificationCodeAuthAPI,
  verifyCodeAuth as verifyCodeAuthAPI,
  resetPasswordByToken as resetPasswordByTokenAPI,
} from '@/apis/account'
import type { ICommonReturn } from '@/axios/type'
import { VerificationCodes } from '@/constants/mapData/mail'

export const useChangePassword = () => {
  const { findMockTreeValueByKey } = useSettingsStore()

  const token = ref<string>('')

  const sendEmail = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        sendVerificationCodeAuthAPI(VerificationCodes.ChangePWD)
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

  const verifyCode = (code: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        verifyCodeAuthAPI(code, VerificationCodes.ChangePWD)
          .then(res => {
            const resData = res as ICommonReturn<string>
            token.value = resData.data
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const verifyPassword = (password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        // verifyCodeAPI( code, password)
        //   .then(res => {
        //     const resData = res as ICommonReturn<string>
        //     resolve(resData.data)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
        //   .finally(() => {})
      }
    })
  }

  const resetPassword = (password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        resetPasswordByTokenAPI(token.value, password)
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

  return {
    sendEmail,
    verifyCode,
    verifyPassword,
    resetPassword,
  }
}
