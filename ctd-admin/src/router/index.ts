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
          meta: { belong: 'user', title: '用户管理' }
        },
        {
          path: '/home/product',
          component: () => import('@/views/Product/ProductView.vue'),
          name: 'product',
          meta: { belong: 'product', title: '产品管理' }
        },
        {
          path: '/home/demand',
          component: () => import('@/views/Demand/DemandView.vue'),
          name: 'demand',
          meta: { belong: 'demand', title: '需求管理' }
        },
        {
          path: '/home/setting',
          component: () => import('@/views/Setting/SettingView.vue'),
          name: 'setting',
          meta: { belong: 'setting', title: '系统配置' }
        }
      ]
    }
  ]
})

export default router
