import type { IMenu } from '@/types/common'

export const mainMenus: IMenu[] = [
  { path: '/user', label: '用户管理', icon: 'i-solar:user-linear' },
  { path: '/product', label: '产品管理', icon: 'i-fluent-mdl2:product-list' },
  { path: '/demand', label: '需求管理', icon: 'i-carbon:document-requirements' },
  { path: '/setting', label: '系统配置', icon: 'i-carbon:settings' }
]
