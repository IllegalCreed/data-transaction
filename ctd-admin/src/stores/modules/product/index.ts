import { defineStore } from 'pinia'
import { useProduct } from './product'
import { useApproval } from './approval'

export const useProductStore = defineStore('product', () => {
  const {
    getProducts,
    getProduct,
    deleteProducts,
    getVersion,
    getPriceDefinition,
    getProductOptionsByName,
    getProductOptionsByID
  } = useProduct()
  const { getProductRejectReason, getProductApprovalLogs } = useApproval()

  return {
    // useProduct
    ...{
      getProducts,
      getProduct,
      deleteProducts,
      getVersion,
      getPriceDefinition,
      getProductOptionsByName,
      getProductOptionsByID
    },
    // useApproval
    ...{
      getProductRejectReason,
      getProductApprovalLogs
    }
  }
})
