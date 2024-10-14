export enum TransactionMode {
  Pitch = 0, // 比稿类型
  Tender = 1 // 招标类型
}
export enum PayType {
  ByWorkTime = 0, // 按工时
  ByFixedPrice = 1 // 一口价
}

// 定义交易模式类型
export type TransactionType =
  | { mode: TransactionMode.Pitch } // 比稿类型
  | { mode: TransactionMode.Tender; payType: PayType } // 招标类型

export enum DemandOrderStatus {
  Pending = 0, // 待审核
  Bidding = 1, // 投标/竞标中
  Contract = 2, // 合同协商
  ToDeliver = 3, // 待交付
  ToCheck = 4, // 待验查
  ToReview = 5, // 待评价
  Reviewed = 6 // 已评价
}

// 定义启用状态枚举
export enum DemandActiveStatus {
  Enabled = 0, // 启用
  Disabled = 1 // 停用
}

export interface IDemand {
  id: number
  title: string
  description: string
  publisher: string
  budget: number
  transactionType: TransactionType
  createTime: string
  tags: string[]
}

export interface IDemandBaseInfo {
  title: string
  description: string
  publisher: string
  budget: number
  transactionType: TransactionType
  createTime: string
  expectedDeliveryDate: string
  status: DemandOrderStatus // 收藏之后可能需要该属性
  tags: string[]
}

export interface IDemandDetails {
  content: string
  attachments: { name: string; url: string }[]
}

export interface IOrderDemand {
  id: number
  title: string
  budget: number
  transactionType: TransactionType
  createTime: string
  status: DemandOrderStatus
  activeStatus: DemandActiveStatus
  expectedDeliveryDate: string
  actualDeliveryDate?: string
}

export interface IOrderDemandDetails {
  id: number
  title: string
  shotDesc: string
  budget: number
  transactionType: TransactionType
  createTime: string
  status: DemandOrderStatus
  activeStatus: DemandActiveStatus
  expectedDeliveryDate: string
  actualDeliveryDate?: string
}
