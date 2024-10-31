// 产品订单状态
export enum ProductOrderStatus {
  Pending = 'Pending',
  Contract = 'Contract',
  ToDeliver = 'ToDeliver',
  ToCheck = 'ToCheck',
  ToReview = 'ToReview',
  Completed = 'Completed',
}

export const PRODUCT_ORDER_STATUS_MAP: Record<ProductOrderStatus, string> = {
  [ProductOrderStatus.Pending]: '待审核',
  [ProductOrderStatus.Contract]: '合同协商',
  [ProductOrderStatus.ToDeliver]: '待交付',
  [ProductOrderStatus.ToCheck]: '待验查',
  [ProductOrderStatus.ToReview]: '待评价',
  [ProductOrderStatus.Completed]: '已完成',
}

// 产品类型
export enum ProductType {
  Dataset = 'Dataset',
  API = 'API',
}

export const PRODUCT_TYPE_MAP: Record<ProductType, string> = {
  [ProductType.Dataset]: '数据集',
  [ProductType.API]: 'API',
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
