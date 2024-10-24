import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'

export const useAccountStore = defineStore('account', () => {
  const { logout, resetPwd, userinfo, getUserInfo } = useAccount()
  const { login, getCode, getAd, links, getLinks } = useLogin()
  const {
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    register,
    activationAccount,
    tokenExchangeEmail,
    reSendActivationEmail,
    getAds: getRegisterAds,
  } = useRegister()
  const {
    email: forgotEmail,
    setEmail: setForgotEmail,
    token: forgotToken,
    setToken: setForgotToken,
    sendEmail: forgotSendEmail,
    verifyCode: forgotVerifyCode,
    resetPassword: forgotResetPassword,
    getAds: getForgotAds,
  } = useForgot()

  return {
    ...{
      login,
      logout,
      getCode,
      resetPwd,
      userinfo,
      getUserInfo,
      links,
      getLinks,
      getAd,
    },
    ...{
      getRegisterAds,
      userIdentity,
      setUserIdentity,
      personalInfo,
      enterpriseInfo,
      baseInfo,
      register,
      activationAccount,
      tokenExchangeEmail,
      reSendActivationEmail,
    },
    ...{
      forgotEmail,
      setForgotEmail,
      forgotToken,
      setForgotToken,
      forgotSendEmail,
      forgotVerifyCode,
      forgotResetPassword,
      getForgotAds,
    },
  }
})
