// 产品订单状态
export enum ProductOrderStatus {
  Pending = 0,
  Contract, // 1
  ToDeliver, // 2
  ToCheck, // 3
  ToReview, // 4
  Reviewed, // 5
}

// 产品类型
export enum ProductType {
  Dataset = 0,
  API, // 1
}

// 产品规格
export interface IProductSpec {
  key: string
  label: string
}

// 产品规格组
export interface IProductSpecGroup extends IProductSpec {
  specs: IProductSpec[]
}

export interface IProductBase {
  id: string | number
  name: string
  description: string
  sellerId: string | number
  sellerName: string
  tags: string[]
  imageUrl?: string
}

// 产品列表项
export interface IProduct extends IProductBase {
  showPrice: number | null
}

// 产品详情
export interface IProductDetail extends IProductBase {
  soldCount: number
  hasCount: boolean
  specGroups: IProductSpecGroup[]
}

// 订单中的产品规格
export interface IOrderSpecification {
  key: string
  value: string | number
}

// 产品订单列表项
export interface IOrderProduct {
  id: number
  orderNum: string | number
  name: string
  imageUrl?: string
  description: string
  type: ProductType
  paymentAmount: number
  status: ProductOrderStatus
  purchaseDate: string
  expectedDeliveryDate?: string
  actualDeliveryDate?: string
}

// 产品订单详情
export interface IOrderProductDetail extends IOrderProduct {
  sellerId: string | number
  sellerName: string
  hasCount: boolean
  count: number
  specifications: IOrderSpecification[]
}
