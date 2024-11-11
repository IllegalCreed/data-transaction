import { defineStore } from 'pinia'
import { useLogin } from './login'

export const useAccountStore = defineStore('account', () => {
  const { login, getCode, logout } = useLogin()

  return {
    ...{
      login,
      getCode,
      logout
    }
  }
})
