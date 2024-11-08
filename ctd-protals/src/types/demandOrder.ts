import type { ActiveStatus } from './common'
import type { TransactionType } from './demand'

export enum DemandOrderStatus {
  Pending = 'pending',
  Bidding = 'bidding',
  Contract = 'contract',
  ToDeliver = 'toDeliver',
  ToCheck = 'toCheck',
  ToReview = 'toReview',
  Completed = 'completed',
}

export const DEMAND_ORDER_STATUS_MAP = {
  [DemandOrderStatus.Pending]: '待审核',
  [DemandOrderStatus.Bidding]: '投标/竞标中',
  [DemandOrderStatus.Contract]: '合同协商',
  [DemandOrderStatus.ToDeliver]: '待交付',
  [DemandOrderStatus.ToCheck]: '待验查',
  [DemandOrderStatus.ToReview]: '待评价',
  [DemandOrderStatus.Completed]: '已完成',
}

export interface IOrderDemand {
  id: number
  title: string
  budget: number
  transactionType: TransactionType
  createTime: string
  status: DemandOrderStatus
  activeStatus: ActiveStatus
  expectedDeliveryDate: string
  actualDeliveryDate?: string
}

export interface IOrderDemandDetail extends IOrderDemand {
  tags: string[]
  description: string
}
