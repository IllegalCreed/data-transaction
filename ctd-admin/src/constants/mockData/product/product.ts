import { ProductStatus, type IProductItem } from '@/types/product'

export const products: IProductItem[] = [
  {
    id: 1,
    name: '测试产品',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.Approving,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 2,
    name: '测试产品',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.OffSale,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 3,
    name: '测试产品',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.OnSale,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 4,
    name: '测试产品',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.Rejected,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  }
]
