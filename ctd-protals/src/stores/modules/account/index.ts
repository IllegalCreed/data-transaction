import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'
import { useSecurity } from './security'

export const useAccountStore = defineStore('account', () => {
  const {
    logout,
    resetPwd,
    userinfo,
    getUserInfo,
    mockInfoType,
    setMockInfoType,
    uploadAvatar,
    editInfo,
  } = useAccount()
  const { login, getCaptcha, checkCaptcha, getAd, links, getLinks } = useLogin()
  const {
    userType,
    setUserType,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    register,
    activateAccount,
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
  const { securityInfo, getSecurityInfo } = useSecurity()

  return {
    ...{
      login,
      logout,
      getCaptcha,
      checkCaptcha,
      resetPwd,
      userinfo,
      getUserInfo,
      mockInfoType,
      setMockInfoType,
      uploadAvatar,
      editInfo,
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
      activateAccount,
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
    ...{
      securityInfo,
      getSecurityInfo,
    },
  }
})
