import type { ILink } from '@/types/master'
import { getLinks as getLinksAPI } from '@/apis/link'
import { links as mockLinks } from '@/constants/mockData/master/link'

export const useLinks = () => {
  const settingsStore = useSettingsStore()

  const links = ref<ILink[]>()

  const getLinks = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          links.value = mockLinks
          resolve()
        }, 1000)
      } else {
        getLinksAPI()
          .then((res: unknown) => {
            links.value = res as ILink[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    links,
    getLinks
  }
}
