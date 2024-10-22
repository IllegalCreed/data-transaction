import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'

export const useAccountStore = defineStore('account', () => {
  const { logout, resetPwd, userinfo, getUserInfo } = useAccount()
  const { login, getCode, getAd, links, getLinks } = useLogin()
  const {
    getAds: getRegisterAds,
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    reSendEmail,
    register,
  } = useRegister()
  const { getAds: getForgotAds } = useForgot()

  return {
    login,
    logout,
    getCode,
    resetPwd,
    userinfo,
    getUserInfo,
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
    register,
    getForgotAds,
  }
})
