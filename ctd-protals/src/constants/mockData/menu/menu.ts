import type { IMenu } from '@/types/master'

export const mainMenus: IMenu[] = [
  {
    path: '/home',
    label: '首页',
    icon: 'i-ant-design:home-outlined',
  },
  {
    path: '/scene',
    label: '应用场景',
    icon: 'i-carbon:application-web',
  },
  {
    path: '/product',
    label: '数据交易',
    icon: 'i-tabler:database-dollar',
  },
  {
    path: '/service',
    label: '数据服务',
    icon: 'i-carbon:data-vis-1',
  },
  {
    path: '/consult',
    label: '咨询与代办',
    icon: 'i-lineicons:consulting',
  },
  {
    path: '/demand',
    label: '需求中心',
    icon: 'i-carbon:document-requirements',
  },
]

export const mineMenus: IMenu[] = [
  {
    path: '/mine/profile',
    label: '我的资料',
    icon: 'i-proicons:person-circle',
  },
  {
    path: '/mine/orders',
    label: '我的订单',
    icon: 'i-lsicon:work-order-info-filled',
    children: [
      {
        path: '/mine/orders/products',
        label: '数据产品',
        icon: 'i-tabler:database-dollar',
      },
      {
        path: '/mine/orders/services',
        label: '数据服务',
        icon: 'i-carbon:data-vis-1',
      },
      {
        path: '/mine/orders/consults',
        label: '咨询代办',
        icon: 'i-lineicons:consulting',
      },
    ],
  },
  {
    path: '/mine/demands',
    label: '我的需求',
    icon: 'i-f7:doc-text',
  },
  {
    path: '/mine/favorites',
    label: '我的收藏',
    icon: 'i-mynaui:star',
    children: [
      {
        path: '/mine/favorites/products',
        label: '产品收藏',
        icon: 'i-ic:outline-bookmarks',
      },
      {
        path: '/mine/favorites/demands',
        label: '需求收藏',
        icon: 'i-material-symbols:favorite-outline',
      },
    ],
  },
  {
    path: '/mine/comments',
    label: '我的评论',
    icon: 'i-uil:comment-lines',
    children: [
      {
        path: '/mine/comments/products',
        label: '产品评论',
        icon: 'i-lets-icons:comment',
      },
      {
        path: '/mine/comments/demands',
        label: '需求评论',
        icon: 'i-uil:comment-dots',
      },
    ],
  },
]

export const systemSettingMenus: IMenu[] = [
  {
    path: 'settings',
    label: '系统设置',
    icon: 'i-carbon:settings',
  },
  {
    path: 'search',
    label: '全局搜索',
    icon: 'i-ic:round-search',
  },
]

export const logoutMenu: IMenu = {
  path: 'logout',
  label: '退出登录',
  icon: 'i-mingcute:exit-line',
}
