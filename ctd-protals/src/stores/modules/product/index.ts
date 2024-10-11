import { defineStore } from 'pinia'
import { useFilter } from './filter'
import { useSorting } from './sorting'
import { useProduct } from './product'

export const useProductStore = defineStore('product', () => {
  const { filterSource, getFilterSource, filters } = useFilter()
  const { sortingSource, getSortingSource, sortings } = useSorting()
  const { products, getProducts, getProduct, getPrice, getRecommendProducts } = useProduct()

  return {
    filterSource,
    getFilterSource,
    filters,
    sortingSource,
    getSortingSource,
    sortings,
    products,
    getProducts,
    getProduct,
    getPrice,
    getRecommendProducts
  }
})
