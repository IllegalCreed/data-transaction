import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'

export const useAccountStore = defineStore('account', () => {
  const { login, logout, getCode, resetPwd } = useAccount()
  const { getAd, links, getLinks } = useLogin()
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
    links,
    getLinks,
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
