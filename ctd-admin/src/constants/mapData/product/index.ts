import type { IOption } from '@/types/common'
export enum ProductStatus {
  Approving = 'approving',
  OffSale = 'offSale',
  OnSale = 'onSale',
  Rejected = 'rejected'
}
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

export enum ProductPriceTypes {
  Specs = 'specs'
}
export const PRODUCT_PRICT_TYPES_MAP: Record<ProductPriceTypes, string> = {
  [ProductPriceTypes.Specs]: '按规格定价'
}

export enum ProductForm {
  Package = 'package',
  Api = 'api',
  Multimedia = 'multimedia',
  VirtualArt = 'virtual-art',
  Other = 'other'
}
export const PRODUCT_FORM_MAP: Record<ProductForm, string> = {
  [ProductForm.Package]: '数据集',
  [ProductForm.Api]: 'API',
  [ProductForm.Multimedia]: '多媒体',
  [ProductForm.VirtualArt]: '虚拟艺术品',
  [ProductForm.Other]: '其他'
}
export const productFormOptions: IOption[] = Object.values(ProductForm).map((value) => ({
  value,
  label: PRODUCT_FORM_MAP[value]
}))

export enum ProductDataField {
  ScenicSpot = 'scenic-spot',
  Traffic = 'traffic',
  Hotel = 'hotel',
  Shop = 'shop',
  Weather = 'weather',
  Performance = 'performance',
  Other = 'other'
}
export const PRODUCT_DATA_FIELD_MAP: Record<ProductDataField, string> = {
  [ProductDataField.ScenicSpot]: '景区',
  [ProductDataField.Traffic]: '交通',
  [ProductDataField.Hotel]: '酒店',
  [ProductDataField.Shop]: '商铺',
  [ProductDataField.Weather]: '气象',
  [ProductDataField.Performance]: '演出',
  [ProductDataField.Other]: '其他'
}
export const productDataFieldOptions: IOption[] = Object.values(ProductDataField).map((value) => ({
  value,
  label: PRODUCT_DATA_FIELD_MAP[value]
}))

export enum ProductDataSource {
  PlatformData = 'platform-data',
  GovernmentData = 'government-data',
  ThirdPartyData = 'third-party-data',
  OpenData = 'open-data',
  Other = 'other'
}
export const PRODUCT_DATA_SOURCE_MAP: Record<ProductDataSource, string> = {
  [ProductDataSource.PlatformData]: '平台数据',
  [ProductDataSource.GovernmentData]: '政府数据',
  [ProductDataSource.ThirdPartyData]: '第三方可信数据',
  [ProductDataSource.OpenData]: '公开数据',
  [ProductDataSource.Other]: '其他'
}
export const productDataSourceOptions: IOption[] = Object.values(ProductDataSource).map(
  (value) => ({
    value,
    label: PRODUCT_DATA_SOURCE_MAP[value]
  })
)

export enum Region {
  Xicheng = 'xicheng',
  Dongcheng = 'dongcheng',
  Chaoyang = 'chaoyang',
  Fengtai = 'fengtai',
  Shijingshan = 'shijingshan',
  Haidian = 'haidian',
  Tongzhou = 'tongzhou',
  Daxing = 'daxing',
  Fangshan = 'fangshan',
  Mentougou = 'mentougou',
  Changping = 'changping',
  Shunyi = 'shunyi',
  Pinggu = 'pinggu',
  Yanqing = 'yanqing',
  Huairou = 'huairou',
  Miyun = 'miyun',
  Other = 'other'
}
export const REGION_MAP: Record<Region, string> = {
  [Region.Xicheng]: '西城区',
  [Region.Dongcheng]: '东城区',
  [Region.Chaoyang]: '朝阳区',
  [Region.Fengtai]: '丰台区',
  [Region.Shijingshan]: '石景山区',
  [Region.Haidian]: '海淀区',
  [Region.Tongzhou]: '通州区',
  [Region.Daxing]: '大兴区',
  [Region.Fangshan]: '房山区',
  [Region.Mentougou]: '门头沟区',
  [Region.Changping]: '昌平区',
  [Region.Shunyi]: '顺义区',
  [Region.Pinggu]: '平谷区',
  [Region.Yanqing]: '延庆区',
  [Region.Huairou]: '怀柔区',
  [Region.Miyun]: '密云区',
  [Region.Other]: '其他'
}
export const regionOptions: IOption[] = Object.values(Region).map((value) => ({
  value,
  label: REGION_MAP[value]
}))

export enum Time {
  Holiday = 'holiday',
  Weekday = 'weekday',
  PeakSeason = 'peak-season',
  OffSeason = 'off-season',
  Other = 'other'
}
export const TIME_MAP: Record<Time, string> = {
  [Time.Holiday]: '节假日',
  [Time.Weekday]: '平日',
  [Time.PeakSeason]: '旺季',
  [Time.OffSeason]: '淡季',
  [Time.Other]: '其他'
}
export const timeOptions: IOption[] = Object.values(Time).map((value) => ({
  value,
  label: TIME_MAP[value]
}))
