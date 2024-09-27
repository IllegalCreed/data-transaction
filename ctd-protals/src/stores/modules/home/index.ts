import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const { banners, getBanners } = useBanners()
  const { modules, getModules } = useModules()
  const { ads, getAds } = useAds()
  const { partners, getPartners, topPartners, getTopPartners } = usePartners()

  return {
    banners,
    getBanners,
    modules,
    getModules,
    ads,
    getAds,
    partners,
    getPartners,
    topPartners,
    getTopPartners
  }
})
