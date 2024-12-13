import type { IMenu } from '@/types/common'

export const mainMenus: IMenu[] = [
  {
    path: '/home/user',
    label: '用户管理',
    icon: 'i-solar:user-linear',
    children: [
      {
        path: '/home/user/individual',
        label: '个人用户',
        icon: 'i-mynaui:users'
      },
      {
        path: '/home/user/enterprise',
        label: '企业用户',
        icon: 'i-ph:users-three'
      }
    ]
  },
  { path: '/home/banner', label: '横幅管理', icon: 'i-ph:flag-banner-fold' },
  { path: '/home/company', label: '公司管理', icon: 'i-streamline:business-handshake' },
  { path: '/home/scene', label: '场景管理', icon: 'i-carbon:application-web' },
  { path: '/home/news', label: '资讯管理', icon: 'i-iconamoon:news-light' },
  { path: '/home/product', label: '产品管理', icon: 'i-fluent-mdl2:product-list' },
  { path: '/home/demand', label: '需求管理', icon: 'i-carbon:document-requirements' },
  { path: '/home/setting', label: '系统配置', icon: 'i-carbon:settings' }
]
