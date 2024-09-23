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

export interface IOrderSpecification {
  key: string
  value: string | number
}

export type OrderStatus =
  | 0 // 待审核
  | 1 // 合同协商
  | 2 // 待交付
  | 3 // 待验查
  | 4 // 待评价
  | 5 // 已评价

export type ProductType =
  | 0 // 数据集
  | 1 // API

export interface IOrderDetails {
  orderId: number
  productName: string
  productImageUrl: string
  productDescription: string
  productType: ProductType
  specifications: IOrderSpecification[]
  status: OrderStatus
  merchantName: string
  paymentAmount: number
  orderTime: string
  expectedDeliveryTime?: string // 当状态为 '待交付' 时显示
  actualDeliveryTime?: string // 当状态为 '待验查' 及之后的状态显示
}
