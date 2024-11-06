// 定义启用状态枚举
export enum ActiveStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

export const ACTIVE_STATUS_MAP = {
  [ActiveStatus.Enabled]: '启用',
  [ActiveStatus.Disabled]: '停用',
}
