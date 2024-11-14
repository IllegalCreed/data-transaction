import { ProductPriceTypes, ProductStatus } from '@/constants/mapData/product'
import type { IProductItem, IProductVersion } from '@/types/product'

export const products: IProductItem[] = [
  {
    id: 1,
    name: '测试产品1',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家1',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200,
    soldCount: 0,
    rating: 0,
    status: ProductStatus.Approving,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 2,
    name: '测试产品2',
    description: '测试描述',
    sellerId: 2,
    sellerName: '测试商家2',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
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
    name: '测试产品3',
    description: '测试描述',
    sellerId: 3,
    sellerName: '测试商家3',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
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
    name: '测试产品4',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家1',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.Rejected,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 5,
    name: '测试产品5',
    description: '测试描述',
    sellerId: 1,
    sellerName: '测试商家1',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.Approving,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  }
]

export const versions: IProductVersion[] = [
  {
    version: 0,
    name: '测试产品5',
    description: '修改了测试描述',
    showPrice: 2000,
    tags: ['测试标签1', '测试标签2', '增加的测试标签3'],
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    imageUrls: [],
    detail: `
      <h1>测试标题</h1>
      <p>测试内容</p>
      <p>增加的测试内容</p>
    `,
    priceType: ProductPriceTypes.Specs,
    submitTime: '2022-01-01 00:00:00'
  },
  {
    version: 1,
    name: '测试产品5',
    description: '测试描述',
    showPrice: 200,
    tags: ['测试标签1', '测试标签2'],
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    imageUrls: [
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
    ],
    detail: `
      <h1>测试标题</h1>
      <p>测试内容</p>
    `,
    priceType: ProductPriceTypes.Specs,
    submitTime: '2022-01-01 00:00:00'
  }
]
