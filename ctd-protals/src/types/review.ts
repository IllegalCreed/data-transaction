import type { TransactionType } from './demand'
import type { ProductType } from './productOrder'

export interface IReview {
  id: string | number
  avatar?: string
  name: string
  content: string
  reply?: string
  usefulCount: number
  rating: number
  createTime: string
}

export enum ReviewType {
  All = 0,
  Positive = 1,
  Neutral = 2,
  Negative = 3,
  Replied = 4,
}

export interface IReviewInfo {
  rating: number
  filters: {
    key: ReviewType
    count: number
  }[]
}

export interface IProductReview extends Omit<IReview, 'name'> {
  type: 'product'
  product: {
    productId: string | number
    name: string
    type: ProductType
    price: number
    imageUrl: string
  }
}

export interface IDemandReview extends Omit<IReview, 'name'> {
  type: 'demand'
  demand: {
    demandId: string | number
    name: string
    transactionType: TransactionType
    budget: number
  }
}

export type IMyReview = IProductReview | IDemandReview
