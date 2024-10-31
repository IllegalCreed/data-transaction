import {
  ProductOrderStatus,
  ProductType,
  type IContract,
  type IOrderProduct,
  type IOrderProductDetail,
} from '@/types/productOrder'
import type { IReview } from '@/types/review'

export const orderProducts: IOrderProduct[] = [
  {
    id: 1,
    orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
    name: '数据产品数据产品数据产品数据产品数据产品数据产品数据产品数据产品',
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
    orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
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
    orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
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
    orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
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
    orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
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
    orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
    name: '数据产品 F',
    description: '数据产品A的描述',
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
    type: ProductType.API,
    purchaseDate: '2023-09-23',
    paymentAmount: 700,
    status: ProductOrderStatus.Completed, // 已评价
    actualDeliveryDate: '2023-09-30',
  },
]

export const orderProductDetails: {
  id: string | number
  detailInfo: IOrderProductDetail
  contract: IContract
  review: IReview
}[] = [
  {
    id: 1,
    detailInfo: {
      sellerId: 1,
      hasCount: true,
      count: 5,
      id: 1,
      orderNum: 'ASDH98IKJ9865587KJHOASDN0976DISB',
      name: '高级数据分析平台',
      description: '一个功能全面的数据分析平台，适用于大规模数据处理。',
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
      type: ProductType.API,
      specifications: [
        { key: '购买形式', value: '一次性购买' },
        { key: '购买形式', value: '一次性购买' },
        { key: '购买形式', value: '一次性购买' },
        { key: '购买形式', value: '一次性购买' },
        { key: '购买形式', value: '一次性购买' },
        { key: '购买形式', value: '一次性购买' },
      ],
      status: ProductOrderStatus.Pending,
      sellerName: '数据科技有限公司',
      paymentAmount: 999.99,
      purchaseDate: '2024-03-15 09:00:00',
      expectedDeliveryDate: '2024-03-25 17:00:00',
      actualDeliveryDate: '2024-03-24 16:30:00', // 实际交付时间
    },
    contract: {
      id: 1,
      contractNum: 'C-20240425-001',
      contractUrl: 'www.baidu.com',
      signingTime: '2024-04-25 10:30:00',
      partyA: '消费者名称',
      partyB: '科技商家有限公司',
    },
    review: {
      id: 1,
      name: '消费者名称',
      usefulCount: 10,
      rating: 5,
      createTime: '2024-04-25 10:30:00',
      content: '消费者信息',
      reply: '商家回复信息',
    },
  },
]
