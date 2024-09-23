import { createRouter, createWebHistory } from 'vue-router'
import MasterView from '@/views/Master/MasterView.vue'
import HomeView from '@/views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/RegisterView.vue')
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('../views/Forgot/ForgotView.vue')
    },
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
        },
        {
          path: 'demand/:id',
          name: 'demand-detail',
          component: () => import('@/views/Demand/DemandDetail/DemandDetailView.vue')
        },
        {
          path: 'mine',
          name: 'mine',
          redirect: '/mine/profile',
          component: () => import('@/views/Mine/MineView.vue'),
          children: [
            {
              path: 'profile',
              name: 'my-profile',
              component: () => import('@/views/Mine/Profile/ProfileView.vue')
            },
            {
              path: 'orders',
              name: 'my-orders',
              redirect: '/mine/orders/products',
              component: () => import('@/views/Mine/Order/OrderView.vue'),
              children: [
                {
                  path: 'products',
                  name: 'order-products',
                  component: () => import('@/views/Mine/Order/Product/OrderProduct.vue')
                },
                {
                  path: 'products/:id',
                  name: 'order-products-detail',
                  component: () =>
                    import('@/views/Mine/Order/Product/ProductOrderDetail/ProductOrderDetail.vue')
                },
                {
                  path: 'services',
                  name: 'order-services',
                  component: () => import('@/views/Mine/Order/Service/OrderService.vue')
                },
                {
                  path: 'consults',
                  name: 'order-consults',
                  component: () => import('@/views/Mine/Order/Consult/OrderConsult.vue')
                }
              ]
            },
            {
              path: '/mine/demands',
              name: 'my-demands',
              component: () => import('@/views/Mine/Demand/DemandView.vue')
            },
            {
              path: '/mine/favorites',
              name: 'my-favorites',
              component: () => import('@/views/Mine/Favorite/FavoriteView.vue')
            },
            {
              path: '/mine/comments',
              name: 'my-comments',
              component: () => import('@/views/Mine/Comment/CommentView.vue')
            }
          ]
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
