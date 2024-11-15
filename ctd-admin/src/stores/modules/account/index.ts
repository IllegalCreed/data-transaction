import { defineStore } from 'pinia'
import { useLogin } from './login'
import { useAccount } from './account'

export const useAccountStore = defineStore('account', () => {
  const { login, getCode, logout } = useLogin()
  const { resetPwd } = useAccount()

  return {
    ...{
      login,
      getCode,
      logout,
      resetPwd
    }
  }
})
