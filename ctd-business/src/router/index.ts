import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import LoginView from '@/views/Login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/home',
          redirect: '/home/user'
        },
        {
          path: '/home/user',
          component: () => import('@/views/User/UserView.vue'),
          name: 'user',
          meta: { belong: '/home/user', title: '用户管理' }
        },
        {
          path: '/home/product',
          component: () => import('@/views/Product/ProductView.vue'),
          name: 'product',
          meta: { belong: '/home/product', title: '产品管理' }
        },
        {
          path: '/home/product-detail/:id',
          component: () => import('@/views/Product/ProductDetail/ProductDetailView.vue'),
          name: 'product-detail',
          meta: { belong: '/home/product', title: '产品详情' }
        },
        {
          path: '/home/product-edit/:id',
          component: () => import('@/views/Product/ProductEdit/ProductEditView.vue'),
          name: 'product-edit',
          meta: { belong: '/home/product', title: '产品编辑' }
        },
        {
          path: '/home/demand',
          component: () => import('@/views/Demand/DemandView.vue'),
          name: 'demand',
          meta: { belong: '/home/demand', title: '需求管理' }
        },
        {
          path: '/home/setting',
          component: () => import('@/views/Setting/SettingView.vue'),
          name: 'setting',
          meta: { belong: '/home/setting', title: '系统配置' }
        }
      ]
    }
  ]
})

export default router
