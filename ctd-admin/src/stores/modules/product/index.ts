import { defineStore } from 'pinia'
import { useProduct } from './product'

export const useProductStore = defineStore('product', () => {
  const { getProducts } = useProduct()

  return {
    ...{
      getProducts
    }
  }
})
