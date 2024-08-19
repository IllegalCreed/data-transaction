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
          path: 'data',
          name: 'data',
          component: () => import('@/views/Data/DataView.vue')
        },
        {
          path: 'scene',
          name: 'scene',
          component: () => import('@/views/Scene/SceneView.vue')
        },
        {
          path: 'service',
          name: 'service',
          component: () => import('@/views/Service/ServiceView.vue')
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('@/views/Community/CommunityView.vue')
        }
      ]
    }
  ]
})

export default router
