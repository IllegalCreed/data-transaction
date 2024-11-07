import { defineStore } from 'pinia'
import { useOrderProduct } from './product'
import { useOrderDemand } from './demand'

export const useOrderStore = defineStore('order', () => {
  const {
    productOrders,
    getProductOrders,
    getProductOrderDetail,
    getProductOrderContract,
    getProductOrderReview,
  } = useOrderProduct()

  const {
    demandOrders,
    getDemandOrders,
    getDemandOrderDetail,
    getDemandOrderTenderCompanies,
    getDemandOrderRecommendCompanies,
    getDemandOrderContract,
    getDemandOrderReview,
  } = useOrderDemand()

  return {
    productOrders,
    getProductOrders,
    getProductOrderDetail,
    getProductOrderContract,
    getProductOrderReview,
    demandOrders,
    getDemandOrders,
    getDemandOrderDetail,
    getDemandOrderTenderCompanies,
    getDemandOrderRecommendCompanies,
    getDemandOrderContract,
    getDemandOrderReview,
  }
})
