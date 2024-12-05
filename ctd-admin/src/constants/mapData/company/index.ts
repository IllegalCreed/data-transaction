import type { IOption } from '@/types/common'
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
