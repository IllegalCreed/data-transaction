import { defineStore } from 'pinia'

export const useMasterStore = defineStore('master', () => {
  const { links, getLinks } = useLinks()

  return {
    links,
    getLinks
  }
})
