// 定义招标类型
export type TenderType = '按项目' | '按时间'

// 定义交易模式类型
export type TransactionMode =
  | { type: '比稿' } // 比稿类型
  | { type: '招标'; tenderType: TenderType } // 招标类型

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
  transactionMode: TransactionMode
  createTime: string
  status: DemandOrderStatus
  tags: string[]
}

export interface IOrderDemand {
  id: number
  title: string
  budget: number
  transactionMode: TransactionMode
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
  transactionMode: TransactionMode
  createTime: string
  status: DemandOrderStatus
  activeStatus: DemandActiveStatus
  expectedDeliveryDate: string
  actualDeliveryDate?: string
}
