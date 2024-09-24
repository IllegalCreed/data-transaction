import type { ElTagType } from '@/types/elplus'
import { ProductOrderStatus, ProductType } from '@/types/product'

export const PRODUCT_ORDER_STATUS_MAP: { [key in ProductOrderStatus]: string } = {
  [ProductOrderStatus.PendingReview]: '待审核',
  [ProductOrderStatus.ContractNegotiation]: '合同协商',
  [ProductOrderStatus.PendingDelivery]: '待交付',
  [ProductOrderStatus.PendingInspection]: '待验查',
  [ProductOrderStatus.PendingEvaluation]: '待评价',
  [ProductOrderStatus.Evaluated]: '已评价'
}

export const PRODUCT_ORDER_STATUS_TAG_TYPE: { [key in ProductOrderStatus]: ElTagType } = {
  [ProductOrderStatus.PendingReview]: 'info',
  [ProductOrderStatus.ContractNegotiation]: 'warning',
  [ProductOrderStatus.PendingDelivery]: 'primary',
  [ProductOrderStatus.PendingInspection]: 'success',
  [ProductOrderStatus.PendingEvaluation]: 'warning',
  [ProductOrderStatus.Evaluated]: 'success'
}

export const PRODUCT_TYPE_MAP: { [key in ProductType]: string } = {
  [ProductType.Dataset]: '数据集',
  [ProductType.API]: 'API'
}

export const PRODUCT_TYPE_TAG_TYPE: { [key in ProductType]: ElTagType } = {
  [ProductType.Dataset]: 'success',
  [ProductType.API]: 'warning'
}
