import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', () => {
  const uploadFile = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      resolve(URL.createObjectURL(file))
    })
  }

  return {
    uploadFile
  }
})
