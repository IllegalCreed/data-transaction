import { createRouter, createWebHistory } from 'vue-router'
import MasterView from '@/views/Master/MasterView.vue'
import HomeView from '@/views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'master',
      component: MasterView,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('@/views/Product/ProductView.vue')
        },
        {
          path: 'product/:id',
          name: 'product-detail',
          component: () => import('@/views/Product/ProductDetail/ProductDetailView.vue')
        },
        {
          path: 'catalog',
          name: 'catalog',
          component: () => import('@/views/Catalog/CatalogView.vue')
        },
        {
          path: 'service',
          name: 'service',
          component: () => import('@/views/Service/ServiceView.vue')
        },
        {
          path: 'consult',
          name: 'consult',
          component: () => import('@/views/Consult/ConsultView.vue')
        },
        {
          path: 'company',
          name: 'company',
          component: () => import('@/views/Company/CompanyView.vue')
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('@/views/Community/CommunityView.vue')
        },
        {
          path: 'demand',
          name: 'demand',
          component: () => import('@/views/Demand/DemandView.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，返回到该位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则，滚动到顶部
      return { top: 0 }
    }
  }
})

export default router
