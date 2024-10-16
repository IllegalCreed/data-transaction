import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'

export const useAccountStore = defineStore('account', () => {
  const { login, logout, getCode, resetPwd } = useAccount()
  const { getAd } = useLogin()
  const {
    getAds: getRegisterAds,
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    reSendEmail
  } = useRegister()
  const { getAds: getForgotAds } = useForgot()

  return {
    login,
    logout,
    getCode,
    resetPwd,
    getAd,
    getRegisterAds,
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    reSendEmail,
    getForgotAds
  }
})
