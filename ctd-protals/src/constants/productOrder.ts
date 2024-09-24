import type { ElTagType } from '@/types/elplus'
import { ProductOrderStatus, ProductType } from '@/types/product'

export const PRODUCT_ORDER_STATUS_MAP: { [key in ProductOrderStatus]: string } = {
  [ProductOrderStatus.Pending]: '待审核',
  [ProductOrderStatus.Contract]: '合同协商',
  [ProductOrderStatus.ToDeliver]: '待交付',
  [ProductOrderStatus.ToCheck]: '待验查',
  [ProductOrderStatus.ToReview]: '待评价',
  [ProductOrderStatus.Reviewed]: '已评价'
}

export const PRODUCT_ORDER_STATUS_TAG_TYPE: { [key in ProductOrderStatus]: ElTagType } = {
  [ProductOrderStatus.Pending]: 'info',
  [ProductOrderStatus.Contract]: 'warning',
  [ProductOrderStatus.ToDeliver]: 'primary',
  [ProductOrderStatus.ToCheck]: 'success',
  [ProductOrderStatus.ToReview]: 'warning',
  [ProductOrderStatus.Reviewed]: 'success'
}

export const PRODUCT_TYPE_MAP: { [key in ProductType]: string } = {
  [ProductType.Dataset]: '数据集',
  [ProductType.API]: 'API'
}

export const PRODUCT_TYPE_TAG_TYPE: { [key in ProductType]: ElTagType } = {
  [ProductType.Dataset]: 'success',
  [ProductType.API]: 'warning'
}
