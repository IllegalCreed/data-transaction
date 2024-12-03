import { defineStore } from 'pinia'
import { useProduct } from './product'
import { useApproval } from './approval'

export const useProductStore = defineStore('product', () => {
  const { getProducts, getProduct, deleteProducts, getVersion, getPriceDefinition } = useProduct()
  const { getProductRejectReason, getProductApprovalLogs } = useApproval()

  return {
    // useProduct
    ...{
      getProducts,
      getProduct,
      deleteProducts,
      getVersion,
      getPriceDefinition
    },
    // useApproval
    ...{
      getProductRejectReason,
      getProductApprovalLogs
    }
  }
})
