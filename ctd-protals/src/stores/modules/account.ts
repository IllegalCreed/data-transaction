import { v4 as uuidv4 } from 'uuid'
import { logoutAPI, loginAPI, getCodeAPI, resetPwdAPI, getAdAPI } from '@/apis/account'
import type { ILogin, ILoginCode } from '@/types/login'
import { useTokenStore } from './token'
import { useSettingsStore } from './settings'
import type { ILoginAd } from '@/types/advertisement'

export const useAccountStore = defineStore('account', () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()

  const login = (login: ILogin): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        tokenStore.setToken('testToken')
        resolve()
      } else {
        loginAPI(login)
          .then((res: any) => {
            tokenStore.setToken(res.token)
            resolve()
          })
          .catch((error: any) => {
            reject(error)
          })
      }
    })
  }

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        tokenStore.clearToken()
        resolve()
      } else {
        logoutAPI()
          .then(() => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            tokenStore.clearToken()
          })
      }
    })
  }

  const getCode = (): Promise<ILoginCode> => {
    return new Promise<ILoginCode>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve({
          uuid: uuidv4(),
          img: codeMockData
        })
      } else {
        getCodeAPI()
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

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve()
        tokenStore.clearToken()
      } else {
        resetPwdAPI(oldPwd, newPwd)
          .then(() => {
            resolve()
            tokenStore.clearToken()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
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
    title: '北京市\n文旅数据专区平台',
    desc: '平台旨在整合北京市的文化和旅游数据资源，通过数据交易、数据处理服务、咨询与待办以及需求发布等功能，为企业和公众提供便捷的服务，助力北京市文旅产业的转型与高质量发展。',
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

  const codeMockData = `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`

  return { login, logout, getCode, resetPwd, getAd }
})
