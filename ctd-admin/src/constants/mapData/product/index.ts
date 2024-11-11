import { ProductStatus } from '@/types/product'

export const PRODUCT_STATUS_MAP: Record<ProductStatus, string> = {
  [ProductStatus.Approving]: '待审核',
  [ProductStatus.OffSale]: '未上架',
  [ProductStatus.OnSale]: '已上架',
  [ProductStatus.Rejected]: '已驳回'
}

export const productStatusOptions: { value: string; label: string }[] = Object.values(
  ProductStatus
).map((value) => ({
  value,
  label: PRODUCT_STATUS_MAP[value]
}))
productStatusOptions.unshift({
  value: 'all',
  label: '全部'
})
