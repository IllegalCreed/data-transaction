import type { ProductPriceTypes, ProductStatus } from '@/constants/mapData/product'

// 产品规格
export interface IProductSpec {
  id: string
  label: string
}

// 产品规格组
export interface IProductSpecGroup extends IProductSpec {
  affectsPrice: boolean
  children: IProductSpec[]
}

// 产品价格
export interface IProductSpecsPrice {
  price: number
  specs: { groupId: string; specId: string }[]
}

// 产品价格组（前端展示用）
export interface IProductSpecsPriceGroup {
  specId: string
  label: string
  children: IProductSpecsPrice[]
}

// 产品
interface IProduct {
  id: string | number
  sellerId: string | number
  currentVersion?: string | number
  status: ProductStatus
  createTime: string
  updateTime: string
}

// 产品额外属性
interface IProductExtra {
  rating: number
  soldCount: number
  sellerName: string
}

// 产品版本
export interface IProductVersion {
  version: string | number
  name: string
  description: string
  showPrice: number
  tags: string[]
  coverImageUrl: string
  imageUrls: string[]
  detail: string
  priceType: ProductPriceTypes
  submitTime: string
}

export interface IProductSpecsPriceDefinition {
  defaultPrice: number
  specs: IProductSpecGroup[]
  prices: IProductSpecsPrice[]
}

// 产品列表项
export interface IProductItem
  extends Pick<IProductVersion, 'name' | 'description' | 'showPrice' | 'coverImageUrl'>,
    IProduct,
    IProductExtra {}

// 产品详情
export type IProductDetail = IProduct & IProductExtra
