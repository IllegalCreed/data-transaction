import { defineStore } from 'pinia'
import { useBanner } from './banner'
import { useIndicators } from './indicator'
import { useServices } from './service'
import { useTeams } from './team'

export const useConsultStore = defineStore('consult', () => {
  const { banner, getBanner } = useBanner()
  const { indicators, getIndicators } = useIndicators()
  const { services, getServices } = useServices()
  const { teams, getTeams } = useTeams()

  return {
    banner,
    getBanner,
    indicators,
    getIndicators,
    services,
    getServices,
    teams,
    getTeams
  }
})
