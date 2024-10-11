import type { ISafe } from '@/types/safe'

export const safes: ISafe[] = [
  {
    id: 1,
    title: '买服务',
    imageUrl: new URL('@/assets/icon/product/service.png', import.meta.url).href
  },
  {
    id: 2,
    title: '签合同',
    imageUrl: new URL('@/assets/icon/product/contract.png', import.meta.url).href
  },
  {
    id: 3,
    title: '资金托管',
    imageUrl: new URL('@/assets/icon/product/hosting.png', import.meta.url).href
  },
  {
    id: 4,
    title: '服务商工作',
    imageUrl: new URL('@/assets/icon/product/working.png', import.meta.url).href
  },
  {
    id: 5,
    title: '验收并收款',
    imageUrl: new URL('@/assets/icon/product/paid.png', import.meta.url).href
  },
  {
    id: 6,
    title: '交易评价',
    imageUrl: new URL('@/assets/icon/product/review.png', import.meta.url).href
  }
]
