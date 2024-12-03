import { defineStore } from 'pinia'
import { useProduct } from './product'
import { useApproval } from './approval'

export const useProductStore = defineStore('product', () => {
  const {
    getProducts,
    getProduct,
    changeProductStatus,
    deleteProducts,
    getVersion,
    setVersion,
    getPriceDefinition,
    setPriceDefinition
  } = useProduct()
  const { getProductRejectReason, getProductApprovalLogs } = useApproval()

  return {
    // useProduct
    ...{
      getProducts,
      getProduct,
      changeProductStatus,
      deleteProducts,
      getVersion,
      setVersion,
      getPriceDefinition,
      setPriceDefinition
    },
    // useApproval
    ...{
      getProductRejectReason,
      getProductApprovalLogs
    }
  }
})
