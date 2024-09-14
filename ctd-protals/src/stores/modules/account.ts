import { v4 as uuidv4 } from 'uuid'
import { logoutAPI, loginAPI, getCodeAPI, resetPwdAPI, getAdAPI } from '@/apis/account'
import type { ILogin } from '@/types/login'
import { useTokenStore } from './token'
import { useSettingsStore } from './settings'
import { promiseTimeout } from '@vueuse/core'
import type { ILoginAd } from '@/types/ad'

export const useAccountStore = defineStore('account', () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      loginAPI(login)
        .then((res: any) => {
          tokenStore.setToken(res.token)
          resolve()
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // logoutAPI()
      //   .then(() => {
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
      //   .finally(() => {
      //     tokenStore.clearToken()
      //   })
      tokenStore.clearToken()
      resolve()
    })
  }

  const getCode = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // getCodeAPI()
      //   .then((res) => {
      //     resolve(res)
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
      //   .finally(() => {})
      resolve()
    })
  }

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      resetPwdAPI(oldPwd, newPwd)
        .then(() => {
          resolve()
          tokenStore.clearToken()
        })
        .catch((error: Error) => {
          reject(error)
        })
        .finally(() => {})
    })
  }

  const getAd = (): Promise<ILoginAd> => {
    return new Promise<ILoginAd>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(adMockData), 1000)
      } else {
        getAdAPI()
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const adMockData: ILoginAd = {
    title: '北京市\n文旅数据平台',
    desc: '致力于整合和共享全市文化和旅游数据资源，提升信息化服务水平。平台通过数据交易、处理服务和需求发布等功能，为企业和公众提供便捷、安全的数字化解决方案，助力北京市文旅产业的数字化转型与高质量发展。',
    carousels: [
      {
        id: uuidv4(),
        title: '数据交易功能',
        name: '张三',
        comment:
          '自从使用了这个平台的“数据交易”功能，我们公司大大提高了数据共享和流通的效率，节省了不少时间和成本。平台界面友好，操作简单，让我们能够快速上手。非常推荐其他公司也使用这个功能！',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: uuidv4(),
        title: '数据处理服务',
        name: '李四',
        comment:
          '平台提供的“数据处理服务”真的很棒！我们原本有一批杂乱无章的数据，在平台上进行处理后，数据变得整洁且高效。这项服务帮助我们更准确地预测市场趋势，优化了公司的决策过程。',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: uuidv4(),
        title: '咨询与代办服务',
        name: '王五',
        comment:
          '我对平台提供的“咨询与代办服务”非常满意！工作人员专业且细心，他们的建议帮助我们公司顺利通过了数据合规审核。整个过程高效且透明，我觉得这是我们合作过的最好的一次体验。',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: uuidv4(),
        title: '需求中心',
        name: '赵六',
        comment:
          '使用平台的“需求中心”发布数据需求后，没想到很快就得到了响应，并匹配到了合适的供应商。整个沟通过程非常顺畅。总的来说，这是一个非常值得信赖的平台。',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }

  return { login, logout, getCode, resetPwd, getAd }
})
