import type { ElTagType } from '@/types/elplus'
import { DemandOrderStatus, DemandActiveStatus, TransactionMode, PayType } from '@/types/demand'

export const DEMAND_ORDER_STATUS_MAP: { [key in DemandOrderStatus]: string } = {
  [DemandOrderStatus.Pending]: '待审核',
  [DemandOrderStatus.Bidding]: '投标中',
  [DemandOrderStatus.Contract]: '合同协商',
  [DemandOrderStatus.ToDeliver]: '待交付',
  [DemandOrderStatus.ToCheck]: '待验查',
  [DemandOrderStatus.ToReview]: '待评价',
  [DemandOrderStatus.Reviewed]: '已评价'
}

export const DEMAND_ORDER_STATUS_TAG_TYPE: { [key in DemandOrderStatus]: ElTagType } = {
  [DemandOrderStatus.Pending]: 'info',
  [DemandOrderStatus.Bidding]: 'warning',
  [DemandOrderStatus.Contract]: 'warning',
  [DemandOrderStatus.ToDeliver]: 'primary',
  [DemandOrderStatus.ToCheck]: 'success',
  [DemandOrderStatus.ToReview]: 'warning',
  [DemandOrderStatus.Reviewed]: 'success'
}

export const DEMAND_ACTIVE_STATUS_MAP: { [key in DemandActiveStatus]: string } = {
  [DemandActiveStatus.Enabled]: '启用',
  [DemandActiveStatus.Disabled]: '停用'
}

export const DEMAND_ACTIVE_STATUS_TAG_TYPE: { [key in DemandActiveStatus]: ElTagType } = {
  [DemandActiveStatus.Enabled]: 'success',
  [DemandActiveStatus.Disabled]: 'danger'
}

export const DEMAND_TRANSACTION_MODE_MAP: { [key in TransactionMode]: string } = {
  [TransactionMode.Pitch]: '比稿',
  [TransactionMode.Tender]: '招标'
}

export const DEMAND_PAY_TYPE_MAP: { [key in PayType]: string } = {
  [PayType.ByWorkTime]: '按工时',
  [PayType.ByFixedPrice]: '按项目'
}
