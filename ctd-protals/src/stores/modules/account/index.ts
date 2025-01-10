import { defineStore } from 'pinia'
import { useAccount } from './account'
import { useLogin } from './login'
import { useRegister } from './register'
import { useForgot } from './forgot'
import { useSecurity } from './security'
import { useChangePassword } from './changePassword'
import { useChangeEmail } from './changeEmail'

export const useAccountStore = defineStore('account', () => {
  const {
    logout,
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
  const { sendEmail, verifyCode, verifyPassword, changePassword } =
    useChangePassword()
  const { securityInfo, getSecurityInfo } = useSecurity()
  const {
    verifyRecoveryCode,
    sendToNewEmail,
    changeEmail,
    email: newEmail,
  } = useChangeEmail()

  return {
    ...{
      login,
      logout,
      getCaptcha,
      checkCaptcha,
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
      sendEmail,
      verifyCode,
      verifyPassword,
      changePassword,
    },
    ...{
      verifyRecoveryCode,
      sendToNewEmail,
      changeEmail,
      newEmail,
    },
    ...{
      securityInfo,
      getSecurityInfo,
    },
  }
})
