import { defineStore } from 'pinia'
import { useOrderProduct } from './product'

export const useOrderStore = defineStore('order', () => {
  const { productOrders, getProductOrders, getProductOrderDetail } =
    useOrderProduct()

  return {
    productOrders,
    getProductOrders,
    getProductOrderDetail,
  }
})
