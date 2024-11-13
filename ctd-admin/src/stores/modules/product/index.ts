import { defineStore } from 'pinia'
import { useProduct } from './product'
import { useApproval } from './approval'

export const useProductStore = defineStore('product', () => {
  const { getProducts, getProduct, delProducts } = useProduct()
  const { getLastRejectReason } = useApproval()

  return {
    // useProduct
    ...{
      getProducts,
      getProduct,
      delProducts
    },
    // useApproval
    ...{
      getLastRejectReason
    }
  }
})
