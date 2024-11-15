import type { IMenu } from '@/types/common'

export const mainMenus: IMenu[] = [
  { path: '/home/user', label: '用户管理', icon: 'i-solar:user-linear' },
  { path: '/home/product', label: '产品管理', icon: 'i-fluent-mdl2:product-list' },
  { path: '/home/demand', label: '需求管理', icon: 'i-carbon:document-requirements' },
  { path: '/home/setting', label: '系统配置', icon: 'i-carbon:settings' }
]
