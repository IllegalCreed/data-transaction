import { useSettingsStore } from '@/stores/modules/settings'
import type { ILink } from '@/types/master'
import { getLinks as getLinksAPI } from '@/apis/master/java/link'
import {
  links as mockLinks,
  abouts as mockAbout,
} from '@/constants/mockData/master/link'
import type { ICommonReturn } from '@/axios/type'
import { linkConvert, type ILinkFetchData } from '@/apiConvert/master/link'

export const useLinks = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const links = ref<ILink[]>()

  const getLinks = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('首页')) {
        window.setTimeout(() => {
          links.value = mockLinks
          resolve()
        }, 1000)
      } else {
        getLinksAPI()
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<ILinkFetchData[]>
              links.value = linkConvert(resData.data)
            } else {
              links.value = res as ILink[]
            }
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const abouts = ref<ILink[]>()

  const getAbouts = (): Promise<void> => {
    return new Promise<void>(resolve => {
      abouts.value = mockAbout
      resolve()
    })
  }

  return {
    links,
    getLinks,
    abouts,
    getAbouts,
  }
}
