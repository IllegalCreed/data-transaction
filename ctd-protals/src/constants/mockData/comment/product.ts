import { ProductType } from '@/types/productOrder'
import type { IProductReview } from '@/types/review'

export const productReviews: IProductReview[] = [
  {
    id: 1,
    type: 'product',
    content: '这款产品非常实用，质量很好！',
    reply: '感谢您的支持！',
    usefulCount: 12,
    rating: 4.5,
    createTime: '2022-01-01',
    product: {
      productId: 1,
      name: '智能手表',
      type: ProductType.Dataset,
      price: 199.99,
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
    },
  },
  {
    id: 2,
    type: 'product',
    content: '性价比高，推荐购买。',
    usefulCount: 8,
    rating: 4.0,
    createTime: '2022-01-01',
    product: {
      productId: 2,
      name: '无线耳机',
      type: ProductType.Dataset,
      price: 59.99,
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
    },
  },
  {
    id: 3,
    type: 'product',
    content: '外观时尚，但功能有待提升。',
    reply: '感谢您的反馈，我们会努力改进。',
    usefulCount: 5,
    rating: 3.5,
    createTime: '2022-01-01',
    product: {
      productId: 3,
      name: '蓝牙音箱',
      type: ProductType.Dataset,
      price: 89.99,
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
    },
  },
  {
    id: 7,
    type: 'product',
    content: '包装精美，送人很合适。',
    usefulCount: 9,
    rating: 4.7,
    createTime: '2022-01-01',
    product: {
      productId: 4,
      name: '精美礼盒',
      type: ProductType.API,
      price: 129.99,
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
    },
  },
  {
    id: 8,
    type: 'product',
    content: '物流很快，服务态度好。',
    usefulCount: 6,
    rating: 5.0,
    createTime: '2022-01-01',
    product: {
      productId: 5,
      name: '电子书阅读器',
      type: ProductType.API,
      price: 499.99,
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
    },
  },
  {
    id: 9,
    type: 'product',
    content: '功能简单易用，老人也能轻松上手。',
    usefulCount: 4,
    rating: 4.2,
    createTime: '2022-01-01',
    product: {
      productId: 6,
      name: '老年手机',
      type: ProductType.API,
      price: 299.99,
      imageUrl: new URL(
        '@/assets/placeholder/productDefault.png',
        import.meta.url,
      ).href,
    },
  },
]
