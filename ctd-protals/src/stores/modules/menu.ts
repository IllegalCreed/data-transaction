import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const moduleMenuLinks = ref([
    { path: '/home', label: '首页', icon: 'i-vaadin:home' },
    { path: '/product', label: '数据交易', icon: 'i-vaadin:money' },
    { path: '/service', label: '数据处理', icon: 'i-mdi:database' },
    { path: '/consult', label: '咨询服务', icon: 'i-vaadin:info-circle' },
    { path: '/demand', label: '需求发布', icon: 'i-system-uicons:paper-plane' }
  ])
  return {
    moduleMenuLinks
  }
})
