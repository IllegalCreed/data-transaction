import { defineStore } from 'pinia'
import { useLogin } from './login'
import { useAccount } from './account'

export const useAccountStore = defineStore('account', () => {
  const { login, getCaptcha, logout } = useLogin()
  const { resetPwd, getAdminName } = useAccount()

  return {
    ...{
      login,
      getCaptcha,
      logout,
      resetPwd,
      getAdminName
    }
  }
})
