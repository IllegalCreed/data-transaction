import type { IOption } from '@/types/common'
export enum LinkTypes {
  None = 'none',
  OuterLink = 'outerlink',
  Scene = 'scene',
  Product = 'product',
  Demand = 'demand',
  News = 'news'
}
export const LINK_TYPES_MAP: Record<LinkTypes, string> = {
  [LinkTypes.None]: '无链接',
  [LinkTypes.OuterLink]: '外部链接',
  [LinkTypes.Scene]: '场景链接',
  [LinkTypes.Product]: '产品链接',
  [LinkTypes.Demand]: '需求链接',
  [LinkTypes.News]: '资讯链接'
}
export const LINK_TYPES_COLOR_MAP: Record<
  LinkTypes,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [LinkTypes.None]: 'info',
  [LinkTypes.OuterLink]: 'success',
  [LinkTypes.Scene]: 'warning',
  [LinkTypes.Product]: 'warning',
  [LinkTypes.Demand]: 'warning',
  [LinkTypes.News]: 'warning'
}
export const linkTypesOptions: IOption[] = Object.values(LinkTypes).map((value) => ({
  value,
  label: LINK_TYPES_MAP[value]
}))
