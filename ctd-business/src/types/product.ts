import type {
  ProductDataField,
  ProductDataSource,
  ProductForm,
  ProductPriceTypes,
  ProductStatus,
  Region,
  Time
} from '@/constants/mapData/product'

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
export interface IProductSpecsPriceFrontendGroup {
  groupId: string
  specId: string
  label: string
  children: IProductSpecsPriceFrontendItem[]
}
export interface IProductSpecsPriceFrontendItem {
  price?: number
  specs: { groupId: string; specId: string; label: string }[]
}

// 产品
interface IProduct {
  id: string | number
  currentVersion?: string | number
  status: ProductStatus
  createTime: string
  updateTime: string
}

// 产品额外属性
interface IProductExtra {
  rating: number
  soldCount: number
  reasonId?: string | number
}

// 产品版本
export interface IProductVersion {
  version: string | number
  name: string
  description: string
  showPrice: number
  hasCount: boolean
  tags: string[]
  coverImageUrl: string
  imageUrls: string[]
  detail: string
  form: ProductForm
  dataFields: ProductDataField[]
  dataSources: ProductDataSource[]
  regions: Region[]
  times: Time[]
  priceType: ProductPriceTypes
  createTime: string
}

export interface IProductSpecsPriceDefinition {
  defaultPrice: number
  mainSpecGroupId?: string
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
