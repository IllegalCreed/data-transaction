import type { IOption } from '@/types/common'
export enum ProductStatus {
  ToSubmit = 'toSubmit',
  Approving = 'approving',
  OffSale = 'offSale',
  OnSale = 'onSale',
  Rejected = 'rejected'
}

export const PRODUCT_STATUS_MAP: Record<ProductStatus, string> = {
  [ProductStatus.ToSubmit]: '待提交',
  [ProductStatus.Approving]: '审核中',
  [ProductStatus.OffSale]: '未上架',
  [ProductStatus.OnSale]: '已上架',
  [ProductStatus.Rejected]: '已驳回'
}

export const PRODUCT_STATUS_COLOR_MAP: Record<
  ProductStatus,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [ProductStatus.ToSubmit]: 'primary',
  [ProductStatus.Approving]: 'info',
  [ProductStatus.OffSale]: 'warning',
  [ProductStatus.OnSale]: 'success',
  [ProductStatus.Rejected]: 'danger'
}

export const productStatusOptions: IOption[] = Object.values(ProductStatus).map((value) => ({
  value,
  label: PRODUCT_STATUS_MAP[value]
}))

export enum ProductPriceTypes {
  Specs = 'specs'
}

export const PRODUCT_PRICT_TYPES_MAP: Record<ProductPriceTypes, string> = {
  [ProductPriceTypes.Specs]: '按规格定价'
}
