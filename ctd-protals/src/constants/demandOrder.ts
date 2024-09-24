import type { ElTagType } from '@/types/elplus'
import { DemandOrderStatus, DemandActiveStatus } from '@/types/demand'

// 状态映射
export const DEMAND_ORDER_STATUS_MAP: { [key in DemandOrderStatus]: string } = {
  [DemandOrderStatus.Pending]: '待审核',
  [DemandOrderStatus.Bidding]: '投标/竞标中',
  [DemandOrderStatus.Contract]: '合同协商',
  [DemandOrderStatus.ToDeliver]: '待交付',
  [DemandOrderStatus.ToCheck]: '待验查',
  [DemandOrderStatus.ToReview]: '待评价',
  [DemandOrderStatus.Reviewed]: '已评价'
}

// 状态标签类型映射
export const DEMAND_ORDER_STATUS_TAG_TYPE: { [key in DemandOrderStatus]: ElTagType } = {
  [DemandOrderStatus.Pending]: 'info',
  [DemandOrderStatus.Bidding]: 'warning',
  [DemandOrderStatus.Contract]: 'warning',
  [DemandOrderStatus.ToDeliver]: 'primary',
  [DemandOrderStatus.ToCheck]: 'success',
  [DemandOrderStatus.ToReview]: 'warning',
  [DemandOrderStatus.Reviewed]: 'success'
}

// 启用状态映射
export const DEMAND_ACTIVE_STATUS_MAP: { [key in DemandActiveStatus]: string } = {
  [DemandActiveStatus.Enabled]: '启用',
  [DemandActiveStatus.Disabled]: '停用'
}

// 启用状态标签类型映射
export const DEMAND_ACTIVE_STATUS_TAG_TYPE: { [key in DemandActiveStatus]: ElTagType } = {
  [DemandActiveStatus.Enabled]: 'success',
  [DemandActiveStatus.Disabled]: 'danger'
}
