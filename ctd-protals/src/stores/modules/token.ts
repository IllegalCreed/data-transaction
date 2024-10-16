import router from '@/router'

export const useTokenStore = defineStore('token', () => {
  const remeberMe = useLocalStorage('remeberMe', false)
  const setRemeberMe = (value: boolean) => {
    remeberMe.value = value
  }

  const getStorage = () => (remeberMe.value ? localStorage : sessionStorage)
  const token = ref<string>(getStorage().getItem('token') || '')

  const setToken = (value: string) => {
    token.value = value
    getStorage().setItem('token', value)
  }
  const clearToken = () => {
    token.value = ''
    getStorage().removeItem('token')
    router.replace('/login')
  }

  return {
    remeberMe,
    setRemeberMe,
    token,
    setToken,
    clearToken
  }
})
