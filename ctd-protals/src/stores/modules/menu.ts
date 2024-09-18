import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const moduleMenuLinks = ref([
    { path: '/home', label: '首页', icon: 'i-vaadin:home' },
    { path: '/product', label: '数据交易', icon: 'i-vaadin:money' },
    { path: '/service', label: '数据服务', icon: 'i-mdi:database' },
    { path: '/consult', label: '咨询与代办', icon: 'i-vaadin:info-circle' },
    { path: '/demand', label: '需求中心', icon: 'i-system-uicons:paper-plane' }
  ])

  const personalMenuLinks = [
    { path: '/mine/profile', label: '我的资料', icon: 'i-vaadin:user' },
    {
      path: '/mine/orders',
      label: '我的订单',
      icon: 'i-mdi:clipboard-list-outline',
      children: [
        { path: '/mine/orders/products', label: '数据产品', icon: 'i-mdi:database' },
        { path: '/mine/orders/services', label: '数据服务', icon: 'i-mdi:cloud' },
        { path: '/mine/orders/consults', label: '咨询代办', icon: 'i-mdi:account-tie' }
      ]
    },
    { path: '/mine/demands', label: '我的需求', icon: 'i-basil:document-outline' },
    { path: '/mine/favorites', label: '我的收藏', icon: 'i-vaadin:star' },
    { path: '/mine/comments', label: '我的评论', icon: 'i-vaadin:comment' }
  ]
  return {
    moduleMenuLinks,
    personalMenuLinks
  }
})
