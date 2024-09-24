export interface IOrderSpecification {
  key: string
  value: string | number
}

export enum ProductOrderStatus {
  PendingReview = 0,
  ContractNegotiation = 1,
  PendingDelivery = 2,
  PendingInspection = 3,
  PendingEvaluation = 4,
  Evaluated = 5
}

export enum ProductType {
  Dataset = 0,
  API = 1
}

export interface IProduct {
  id: number
  name: string
  description: string
  seller: string
  price: number
  tags: string[]
  imageUrl: string
}

export interface IOrderProduct {
  id: number
  productName: string
  productImageUrl: string
  type: string
  purchaseDate: string
  price: string
  status: string
  expectedDeliveryDate?: string
  actualDeliveryDate?: string
}

export interface IOrderDetails {
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
  expectedDeliveryTime?: string // 当状态为 '待交付' 时显示
  actualDeliveryTime?: string // 当状态为 '待验查' 及之后的状态显示
}
