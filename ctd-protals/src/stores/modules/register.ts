import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {
  const userIdentity = ref<string>('')

  const setUserIdentity = (identity: string) => {
    userIdentity.value = identity
  }

  return {
    userIdentity,
    setUserIdentity
  }
})
