import { defineStore } from 'pinia'
import { useProduct } from './product'
import { useApproval } from './approval'

export const useProductStore = defineStore('product', () => {
  const { getProducts, delProducts } = useProduct()
  const { getLastRejectReason } = useApproval()

  return {
    // useProduct
    ...{
      getProducts,
      delProducts
    },
    // useApproval
    ...{
      getLastRejectReason
    }
  }
})
