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
          redirect: '/home/individual'
        },
        {
          path: 'individual',
          name: 'user-individual',
          component: () => import('@/views/User/Individual/IndividualUserView.vue'),
          meta: { belong: '/home/individual', title: '个人用户' }
        },
        {
          path: 'individual-detail/:id',
          name: 'individual-detail',
          component: () =>
            import('@/views/User/Individual/IndividualDetail/IndividualDetailView.vue'),
          meta: { belong: '/home/individual', title: '个人用户详情' }
        },
        {
          path: 'enterprise',
          name: 'user-enterprise',
          component: () => import('@/views/User/Enterprise/EnterpriseUserView.vue'),
          meta: { belong: '/home/enterprise', title: '企业用户' }
        },
        {
          path: 'enterprise-detail/:id',
          name: 'enterprise-detail',
          component: () =>
            import('@/views/User/Enterprise/EnterpriseDetail/EnterpriseDetailView.vue'),
          meta: { belong: '/home/enterprise', title: '企业用户详情' }
        },
        {
          path: 'banner',
          component: () => import('@/views/Banner/BannerView.vue'),
          name: 'banner',
          meta: { belong: '/home/banner', title: '横幅管理' }
        },
        {
          path: '/home/banner-detail/:id',
          component: () => import('@/views/Banner/BannerDetail/BannerDetailView.vue'),
          name: 'banner-detail',
          meta: { belong: '/home/banner', title: '横幅详情' }
        },
        {
          path: '/home/banner-edit/:id',
          component: () => import('@/views/Banner/BannerEdit/BannerEditView.vue'),
          name: 'banner-edit',
          meta: { belong: '/home/banner', title: '横幅编辑' }
        },
        {
          path: '/home/company',
          component: () => import('@/views/Company/CompanyView.vue'),
          name: 'company',
          meta: { belong: '/home/company', title: '公司管理' }
        },
        {
          path: '/home/company-detail/:id',
          component: () => import('@/views/Company/CompanyDetail/CompanyDetailView.vue'),
          name: 'company-detail',
          meta: { belong: '/home/company', title: '公司详情' }
        },
        {
          path: '/home/company-edit/:id',
          component: () => import('@/views/Company/CompanyEdit/CompanyEditView.vue'),
          name: 'company-edit',
          meta: { belong: '/home/company', title: '公司编辑' }
        },
        {
          path: '/home/scene',
          component: () => import('@/views/Scene/SceneView.vue'),
          name: 'scene',
          meta: { belong: '/home/scene', title: '场景管理' }
        },
        {
          path: '/home/scene-detail/:id',
          component: () => import('@/views/Scene/SceneDetail/SceneDetailView.vue'),
          name: 'scene-detail',
          meta: { belong: '/home/scene', title: '场景详情' }
        },
        {
          path: '/home/scene-edit/:id',
          component: () => import('@/views/Scene/SceneEdit/SceneEditView.vue'),
          name: 'scene-edit',
          meta: { belong: '/home/scene', title: '场景编辑' }
        },
        {
          path: '/home/news',
          component: () => import('@/views/News/NewsView.vue'),
          name: 'news',
          meta: { belong: '/home/news', title: '资讯管理' }
        },
        {
          path: '/home/news-detail/:id',
          component: () => import('@/views/News/NewsDetail/NewsDetailView.vue'),
          name: 'news-detail',
          meta: { belong: '/home/news', title: '资讯详情' }
        },
        {
          path: '/home/news-edit/:id',
          component: () => import('@/views/News/NewsEdit/NewsEditView.vue'),
          name: 'news-edit',
          meta: { belong: '/home/news', title: '资讯编辑' }
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
          path: '/home/product-approval/:id',
          component: () => import('@/views/Product/ProductApproval/ProductApprovalView.vue'),
          name: 'product-approval',
          meta: { belong: '/home/product', title: '产品审核' }
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
