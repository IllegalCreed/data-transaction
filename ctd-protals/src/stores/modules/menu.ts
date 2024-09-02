import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const moduleMenuLinks = ref([
    { path: '/home', label: '首页', icon: 'i-vaadin:home' },
    { path: '/product', label: '数据交易', icon: 'i-vaadin:money' },
    { path: '/service', label: '数据服务', icon: 'i-mdi:database' },
    { path: '/consult', label: '咨询与代办', icon: 'i-vaadin:info-circle' },
    { path: '/demand', label: '需求中心', icon: 'i-system-uicons:paper-plane' }
  ])
  return {
    moduleMenuLinks
  }
})
