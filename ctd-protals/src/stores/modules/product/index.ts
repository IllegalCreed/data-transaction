import { defineStore } from 'pinia'
import { useFilter } from './filter'
import { useSorting } from './sorting'
import { useProduct } from './product'
import { useSafe } from './safe'
import { useSeller } from './seller'

export const useProductStore = defineStore('product', () => {
  const { filterSource, getFilterSource, filters } = useFilter()
  const { sortingSource, getSortingSource, sortings } = useSorting()
  const { safes, getSafes } = useSafe()
  const { getSeller } = useSeller()
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
    getSeller,
    products,
    getProducts,
    getProduct,
    getPrice,
    getRecommendProducts,
    getProductImages,
    getProductContent
  }
})
