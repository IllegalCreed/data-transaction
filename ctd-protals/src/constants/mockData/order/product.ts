import {
  ProductOrderStatus,
  ProductType,
  type IOrderProduct,
} from '@/types/productOrder'

export const orderProducts: IOrderProduct[] = [
  {
    id: 1,
    orderNum: '#ASDH98IKJ9865587KJHOASDN0976',
    name: '数据产品 A',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.Dataset,
    purchaseDate: '2023-09-18',
    paymentAmount: 200,
    status: ProductOrderStatus.Pending, // 待审核
    expectedDeliveryDate: '',
  },
  {
    id: 2,
    orderNum: '#ASDH98IKJ9865587KJHOASDN0976',
    name: '数据产品 B',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.Dataset,
    purchaseDate: '2023-09-19',
    paymentAmount: 300,
    status: ProductOrderStatus.Contract, // 合同协商
    expectedDeliveryDate: '2023-09-26',
  },
  {
    id: 3,
    orderNum: '#ASDH98IKJ9865587KJHOASDN0976',
    name: '数据产品 C',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.Dataset,
    purchaseDate: '2023-09-20',
    paymentAmount: 400,
    status: ProductOrderStatus.ToDeliver, // 待交付
    expectedDeliveryDate: '2023-09-27',
  },
  {
    id: 4,
    orderNum: '#ASDH98IKJ9865587KJHOASDN0976',
    name: '数据产品 D',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.API,
    purchaseDate: '2023-09-21',
    paymentAmount: 500,
    status: ProductOrderStatus.ToCheck, // 待验查
    actualDeliveryDate: '2023-09-28',
  },
  {
    id: 5,
    orderNum: '#ASDH98IKJ9865587KJHOASDN0976',
    name: '数据产品 E',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.API,
    purchaseDate: '2023-09-22',
    paymentAmount: 600,
    status: ProductOrderStatus.ToReview, // 待评价
    actualDeliveryDate: '2023-09-29',
  },
  {
    id: 6,
    orderNum: '#ASDH98IKJ9865587KJHOASDN0976',
    name: '数据产品 F',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.API,
    purchaseDate: '2023-09-23',
    paymentAmount: 700,
    status: ProductOrderStatus.Reviewed, // 已评价
    actualDeliveryDate: '2023-09-30',
  },
]
