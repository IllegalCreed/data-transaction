import type { IOption } from '@/types/common'
import { ProductStatus } from '@/types/product'

export const PRODUCT_STATUS_MAP: Record<ProductStatus, string> = {
  [ProductStatus.Approving]: '待审核',
  [ProductStatus.OffSale]: '未上架',
  [ProductStatus.OnSale]: '已上架',
  [ProductStatus.Rejected]: '已驳回'
}

export const PRODUCT_STATUS_COLOR_MAP: Record<
  ProductStatus,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [ProductStatus.Approving]: 'info',
  [ProductStatus.OffSale]: 'warning',
  [ProductStatus.OnSale]: 'success',
  [ProductStatus.Rejected]: 'danger'
}

export const productStatusOptions: IOption[] = Object.values(ProductStatus).map((value) => ({
  value,
  label: PRODUCT_STATUS_MAP[value]
}))
