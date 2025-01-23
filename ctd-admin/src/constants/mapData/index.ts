import type { IOption } from '@/types/common'

export enum ActiveStatus {
  Active = 'active',
  Inactive = 'inactive'
}
export const ACTIVE_STATUS_MAP: Record<ActiveStatus, string> = {
  [ActiveStatus.Active]: '已启用',
  [ActiveStatus.Inactive]: '未启用'
}
export const ACTIVE_STATUS_COLOR_MAP: Record<
  ActiveStatus,
  'primary' | 'success' | 'info' | 'warning' | 'danger'
> = {
  [ActiveStatus.Active]: 'success',
  [ActiveStatus.Inactive]: 'warning'
}
export const activeStatusOptions: IOption[] = Object.values(ActiveStatus).map((value) => ({
  value,
  label: ACTIVE_STATUS_MAP[value]
}))

export const booleanTypesOptions: IOption[] = [
  {
    label: '是',
    value: true
  },
  {
    label: '否',
    value: false
  }
]
