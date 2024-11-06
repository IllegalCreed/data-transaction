import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'

export const useAccountStore = defineStore('account', () => {
  const {
    logout,
    resetPwd,
    userinfo,
    getUserInfo,
    mockInfoType,
    setMockInfoType,
  } = useAccount()
  const { login, getCode, getAd, links, getLinks } = useLogin()
  const {
    userType,
    setUserType,
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
      mockInfoType,
      setMockInfoType,
      links,
      getLinks,
      getAd,
    },
    ...{
      getRegisterAds,
      userType,
      setUserType,
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
