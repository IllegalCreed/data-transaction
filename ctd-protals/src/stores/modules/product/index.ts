import { defineStore } from 'pinia'
import { useFilter } from './filter'
import { useSorting } from './sorting'
import { useProduct } from './product'
import { useSafe } from './safe'

export const useProductStore = defineStore('product', () => {
  const { filterSource, getFilterSource, filters } = useFilter()
  const { sortingSource, getSortingSource, sortings } = useSorting()
  const { safes, getSafes } = useSafe()
  const {
    products,
    getProducts,
    getProduct,
    getPrice,
    getRecommendProducts,
    getProductImages,
    getProductContent
  } = useProduct()

  return {
    filterSource,
    getFilterSource,
    filters,
    sortingSource,
    getSortingSource,
    sortings,
    safes,
    getSafes,
    products,
    getProducts,
    getProduct,
    getPrice,
    getRecommendProducts,
    getProductImages,
    getProductContent
  }
})
