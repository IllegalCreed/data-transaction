export enum ProductStatus {
  Approving = 'approving',
  OffSale = 'offSale',
  OnSale = 'onSale',
  Rejected = 'rejected'
}

export interface IProduct {
  id: string | number
  name: string
  description: string
  sellerId: string | number
  sellerName: string
  imageUrl?: string
  showPrice: number | null
  soldCount: number
  currentVersion?: number
  status: ProductStatus
  createTime: string
  updateTime: string
}
