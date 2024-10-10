import { defineStore } from 'pinia'
import { useBanner } from './banner'
import { useCases } from './case'
import { usePrimaryCases } from './primary'
import { useSolicit } from './solicit'

export const useSceneStore = defineStore('scene', () => {
  const { banner, getBanner } = useBanner()
  const { cases, getCases } = useCases()
  const { primaryCases, getPrimaryCases } = usePrimaryCases()
  const { solicit, getSolicit } = useSolicit()

  return {
    banner,
    getBanner,
    cases,
    getCases,
    primaryCases,
    getPrimaryCases,
    solicit,
    getSolicit
  }
})
