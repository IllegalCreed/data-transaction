import { ProductOrderStatus, type IOrderProduct } from '@/types/product'
import { defineStore } from 'pinia'

export const useOrderProductStore = defineStore('orderProduct', () => {
  const orderProducts = reactive<IOrderProduct[]>([
    {
      id: 1,
      productName: '数据产品 A',
      productImageUrl: 'https://via.placeholder.com/250x250',
      type: '数据集',
      purchaseDate: '2023-09-18',
      price: '¥200',
      status: ProductOrderStatus.Pending, // 待审核
      expectedDeliveryDate: ''
    },
    {
      id: 2,
      productName: '数据产品 B',
      productImageUrl: 'https://via.placeholder.com/250x250',
      type: '数据集',
      purchaseDate: '2023-09-19',
      price: '¥300',
      status: ProductOrderStatus.Contract, // 合同协商
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 3,
      productName: '数据产品 C',
      productImageUrl: 'https://via.placeholder.com/250x250',
      type: '数据集',
      purchaseDate: '2023-09-20',
      price: '¥400',
      status: ProductOrderStatus.ToDeliver, // 待交付
      expectedDeliveryDate: '2023-09-27'
    },
    {
      id: 4,
      productName: '数据产品 D',
      productImageUrl: 'https://via.placeholder.com/250x250',
      type: 'API',
      purchaseDate: '2023-09-21',
      price: '¥500',
      status: ProductOrderStatus.ToCheck, // 待验查
      actualDeliveryDate: '2023-09-28'
    },
    {
      id: 5,
      productName: '数据产品 E',
      productImageUrl: 'https://via.placeholder.com/250x250',
      type: 'API',
      purchaseDate: '2023-09-22',
      price: '¥600',
      status: ProductOrderStatus.ToReview, // 待评价
      actualDeliveryDate: '2023-09-29'
    },
    {
      id: 6,
      productName: '数据产品 F',
      productImageUrl: 'https://via.placeholder.com/250x250',
      type: 'API',
      purchaseDate: '2023-09-23',
      price: '¥700',
      status: ProductOrderStatus.Reviewed, // 已评价
      actualDeliveryDate: '2023-09-30'
    }
  ])

  return {
    orderProducts
  }
})
