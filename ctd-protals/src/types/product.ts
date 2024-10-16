export interface IOrderSpecification {
  key: string
  value: string | number
}

export enum ProductOrderStatus {
  Pending = 0,
  Contract = 1,
  ToDeliver = 2,
  ToCheck = 3,
  ToReview = 4,
  Reviewed = 5
}

export enum ProductType {
  Dataset = 0,
  API = 1
}

export interface IProduct {
  id: number
  title: string
  description: string
  seller: string
  price: number
  tags: string[]
  imageUrl: string
}

export interface IProductSpecification {
  key: string
  label: string
  specs: {
    key: string
    label: string
  }[]
}

export interface IProductBaseInfo {
  title: string
  soldCount: number
  description: string
  tags: string[]
  sellerId: string | number
  hasCount: boolean
  specGroups: IProductSpecification[]
}

export interface IOrderProduct {
  id: number
  productName: string
  productImageUrl: string
  type: string
  purchaseDate: string
  price: string
  status: ProductOrderStatus
  expectedDeliveryDate?: string
  actualDeliveryDate?: string
}

export interface IOrderProductDetails {
  orderId: number
  productName: string
  productImageUrl: string
  productDescription: string
  productType: ProductType
  specifications: IOrderSpecification[]
  status: ProductOrderStatus
  merchantName: string
  paymentAmount: number
  orderTime: string
  expectedDeliveryDate?: string // 当状态为 '待交付' 时显示
  actualDeliveryDate?: string // 当状态为 '待验查' 及之后的状态显示
}
