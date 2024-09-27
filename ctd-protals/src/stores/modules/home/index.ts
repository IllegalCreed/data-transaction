import { defineStore } from 'pinia'
import { useBanners } from './banner'
import { useModules } from './modules'
import { useAds } from './advertisement'

export const useHomeStore = defineStore('home', () => {
  const { banners, getBanners } = useBanners()
  const { modules, getModules } = useModules()
  const { ads, getAds } = useAds()

  return {
    banners,
    getBanners,
    modules,
    getModules,
    ads,
    getAds
  }
})
