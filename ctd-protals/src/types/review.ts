export interface IReview {
  avatar?: string
  name: string
  content: string
  reply?: string
  usefulCount: number
  rating: number
  createdAt?: string
}

export interface IReviewInfo {
  rating: number
  filters: {
    key: string
    count: number
  }[]
}

// 当 type 为 'product' 时的接口
export interface IProductReview extends IReview {
  type: 'product'
  product: {
    productId: string
    title: string
    price: number
    image: string
  }
}

// 当 type 为 'demand' 时的接口
export interface IDemandReview extends IReview {
  type: 'demand'
  demand: {
    demandId: string
    title: string
    budget: number
  }
}

// 联合类型
export type IMyReview = IProductReview | IDemandReview
