import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios'

import axios, { AxiosError } from 'axios'
import { useTokenStore } from '@/stores/modules/token'
import { ErrorCodeMessages } from './error-codes'

export const PATH_URL = import.meta.env.VITE_APP_BASE_API
const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: PATH_URL,
})

// 中断逻辑
axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController()
  const url = res.url || ''
  res.signal = controller.signal
  abortControllerMap.set(url, controller)
  return res
})

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || ''
    abortControllerMap.delete(url)
    // 这里不能做任何处理，否则后面的 interceptors 拿不到完整的上下文了
    return res
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 数据转换逻辑
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    const contentType = config.headers['Content-Type'] as string
    if (contentType) {
      if (contentType.includes('multipart/form-data')) {
        const formData = new FormData()
        Object.keys(config.data).forEach(key => {
          formData.append(key, config.data[key])
        })
        config.data = formData
        delete config.headers['Content-Type']
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams()
        Object.keys(config.data).forEach(key => {
          params.append(key, config.data[key])
        })
        config.data = params
      }
    }

    return config
  },
  error => {
    Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const url = response.config.url || ''
    abortControllerMap.delete(url)

    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }

    if (import.meta.env.VITE_BACK_TYPE === 'java') {
      const code = response.data.code ?? 200
      if (code === 401) {
        // const tokenStore = useTokenStore()
        // tokenStore.clearToken()
        return Promise.reject(
          new Error('无效的会话，或者会话已过期，请重新登录。'),
        )
      } else if (!/^2\d{2}$/.test(code)) {
        // 如果不是2开头的三位数
        ElMessage.error(response.data.msg)
        return Promise.reject(new Error(response.data.msg))
      } else {
        return Promise.resolve(response.data)
      }
    } else {
      const code = response.data.code
      if (code === undefined || code === null) {
        throw new Error('服务器返回值数据结构异常')
      }
      if (code === 0) {
        return Promise.resolve(response.data)
      } else {
        ElMessage.error(ErrorCodeMessages[response.data.code as number])
        return Promise.reject(response.data)
      }
    }
  },
  (error: Error) => {
    let message: string = error.message
    if (message.includes('Network Error')) {
      message = '网络异常'
    } else if (message.includes('timeout')) {
      message = '服务器请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = `服务器异常, 错误码: ${message.substring(message.length - 3)}`
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

const request = (config: AxiosRequestConfig): Promise<unknown> => {
  return axiosInstance.request(config)
}

const mixConfig = (
  option: AxiosRequestConfig,
  hasToken: boolean,
): AxiosRequestConfig => {
  let token = useTokenStore().token
  if (import.meta.env.VITE_BACK_TYPE === 'java') {
    token = 'Bearer ' + token
  } else {
    token = 'Bearer ' + token
  }
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: hasToken ? token : '',
    ...option.headers,
  }
  return { ...option, headers }
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: Record<string, unknown>): string {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + '='

    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        for (const key of Object.keys(value as Record<string, unknown>)) {
          const subValue = (value as Record<string, unknown>)[key]
          if (
            subValue !== null &&
            subValue !== '' &&
            typeof subValue !== 'undefined'
          ) {
            const paramKey = `${propName}[${key}]`
            const subPart = encodeURIComponent(paramKey) + '='
            result += subPart + encodeURIComponent(String(subValue)) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(String(value)) + '&'
      }
    }
  }
  return result
}

export default {
  get: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request({ method: 'get', ...mixConfig(option, hasToken) })
  },
  post: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request({ method: 'post', ...mixConfig(option, hasToken) })
  },
  delete: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request({ method: 'delete', ...mixConfig(option, hasToken) })
  },
  put: (option: AxiosRequestConfig, hasToken: boolean = true) => {
    return request({ method: 'put', ...mixConfig(option, hasToken) })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest: () => {
    for (const controller of abortControllerMap.values()) {
      controller.abort()
    }
    abortControllerMap.clear()
  },
}
