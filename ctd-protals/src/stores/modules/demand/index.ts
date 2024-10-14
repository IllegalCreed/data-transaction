import { defineStore } from 'pinia'
import { useFilter } from './filter'
import { useSorting } from './sorting'
import { useDemand } from './demand'
import { useCreate } from './create'

export const useDemandStore = defineStore('demand', () => {
  const { filterSource, getFilterSource, filters } = useFilter()
  const { sortingSource, getSortingSource, sortings } = useSorting()
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
