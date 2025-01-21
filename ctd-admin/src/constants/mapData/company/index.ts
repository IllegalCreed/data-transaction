import type { IOption, IPropLabelMap } from '@/types/common'
import type { ICompanyItem } from '@/types/company'
export enum PartnerTypes {
  None = 'none',
  Partner = 'partner',
  TopPartner = 'topPartner'
}
export const PARTNER_TYPES_MAP: Record<PartnerTypes, string> = {
  [PartnerTypes.None]: '非合作伙伴',
  [PartnerTypes.Partner]: '合作伙伴',
  [PartnerTypes.TopPartner]: '顶级合作伙伴'
}
export const PARTNER_TYPES_COLOR_MAP: Record<
  PartnerTypes,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [PartnerTypes.None]: 'info',
  [PartnerTypes.Partner]: 'success',
  [PartnerTypes.TopPartner]: 'warning'
}
export const partnerTypesOptions: IOption[] = Object.values(PartnerTypes).map((value) => ({
  value,
  label: PARTNER_TYPES_MAP[value]
}))

export const COMPANY_PROP_LABEL_MAP: IPropLabelMap<ICompanyItem> = {
  id: 'ID',
  name: '公司名称',
  link: '链接',
  logoUrl: '商标',
  partnerType: '合作伙伴',
  isShowInFooter: '友情链接',
  status: '状态',
  createdAt: '创建时间',
  updatedAt: '更新时间'
}
