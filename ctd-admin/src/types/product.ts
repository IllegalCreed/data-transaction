export enum ProductStatus {
  Approving = 'approving',
  OffSale = 'offSale',
  OnSale = 'onSale',
  Rejected = 'rejected'
}

interface IProduct {
  id: string | number
  name: string
  description: string
  sellerId: string | number
  imageUrl?: string
  showPrice: number | null
  currentVersion?: number
  status: ProductStatus
}

export interface IProductItem extends IProduct {
  rating: number
  soldCount: number
  sellerName: string
  createTime: string
  updateTime: string
}
