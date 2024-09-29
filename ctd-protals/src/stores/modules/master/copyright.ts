import { getCopyright as getCopyrightAPI } from '@/apis/master/copyright'
import { copyright as mockCopyright } from '@/constants/mockData/master/copyright'

export const useCopyright = () => {
  const settingsStore = useSettingsStore()

  const copyright = ref<string>()

  const getCopyright = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          copyright.value = mockCopyright
          resolve()
        }, 1000)
      } else {
        getCopyrightAPI()
          .then((res: unknown) => {
            copyright.value = res as string
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    copyright,
    getCopyright
  }
}
