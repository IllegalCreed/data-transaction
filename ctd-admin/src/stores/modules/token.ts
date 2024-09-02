import { ElMessageBox } from 'element-plus'
import router from '@/router'

export const useTokenStore = defineStore('token', () => {
  const token = useLocalStorage('token', '')
  const setToken = (value: string) => {
    token.value = value
  }
  const clearToken = () => {
    token.value = ''
    router.replace('/login')
  }

  let isReloginShow = false
  const relogin = () => {
    if (!isReloginShow) {
      isReloginShow = true
      ElMessageBox.confirm('登录状态已失效，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          isReloginShow = false
          clearToken()
        })
        .catch(() => {
          isReloginShow = false
        })
    }
  }

  return {
    token,
    setToken,
    clearToken,
    relogin
  }
})
