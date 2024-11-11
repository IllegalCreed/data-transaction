export enum ProductStatus {
  ToSubmit = 'toSubmit',
  Approving = 'approving',
  OffSale = 'offSale',
  OnSale = 'onSale',
  Rejected = 'rejected'
}

export interface IProduct {
  id: string | number
  name: string
  description: string
  imageUrl?: string
  showPrice: number | null
  soldCount: number
  currentVersion?: number
  status: ProductStatus
  createTime: string
  updateTime: string
}
