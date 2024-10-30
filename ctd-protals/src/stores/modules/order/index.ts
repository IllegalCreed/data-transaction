import { defineStore } from 'pinia'
import { useOrderProduct } from './product'

export const useOrderStore = defineStore('order', () => {
  const { productOrders, getProductOrders } = useOrderProduct()

  return {
    productOrders,
    getProductOrders,
  }
})
