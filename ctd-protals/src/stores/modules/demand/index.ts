import { defineStore } from 'pinia'
import { useFilter } from './filter'
import { useSorting } from './sorting'
import { useDemand } from './demand'
import { useCreate } from './create'
import { useSafe } from './safe'

export const useDemandStore = defineStore('demand', () => {
  const { filterSource, getFilterSource, filters } = useFilter()
  const { sortingSource, getSortingSource, sortings } = useSorting()
  const { safes, getSafes } = useSafe()
  const { demands, getDemands, getDemand, getDemandDetail, getRecommendDemands } = useDemand()
  const {
    baseInfo,
    tradingModel,
    setTradingModel,
    paymentOption,
    customTags,
    checkedPopularTags,
    selectedTags
  } = useCreate()
  return {
    filterSource,
    getFilterSource,
    filters,
    sortingSource,
    getSortingSource,
    sortings,
    safes,
    getSafes,
    demands,
    getDemands,
    getDemand,
    getDemandDetail,
    getRecommendDemands,
    baseInfo,
    tradingModel,
    setTradingModel,
    paymentOption,
    customTags,
    checkedPopularTags,
    selectedTags
  }
})
