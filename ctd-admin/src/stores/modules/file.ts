import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'
import { upload as uploadAPI } from '@/apis/file'
import type { ICommonReturn } from '@/types/common'

export const useFileStore = defineStore('file', () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const uploadFile = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (findMockTreeValueByKey('file')) {
        return new Promise<string>((resolve) => {
          resolve(URL.createObjectURL(file))
        })
      } else {
        uploadAPI(file)
          .then((res) => {
            const result = res as ICommonReturn<string>
            resolve(result.data)
          })
          .catch((error: unknown) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    uploadFile
  }
})
