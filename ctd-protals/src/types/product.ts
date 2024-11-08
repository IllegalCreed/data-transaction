// 产品规格
export interface IProductSpec {
  key: string
  label: string
}

// 产品规格组
export interface IProductSpecGroup extends IProductSpec {
  specs: IProductSpec[]
}

export interface IProductBase {
  name: string
  description: string
  sellerId: string | number
  sellerName: string
  tags: string[]
  imageUrl?: string
}

// 产品列表项
export interface IProduct extends IProductBase {
  id: string | number
  showPrice: number | null
}

// 产品详情
export interface IProductDetail extends IProductBase {
  soldCount: number
  hasCount: boolean
  specGroups: IProductSpecGroup[]
}
