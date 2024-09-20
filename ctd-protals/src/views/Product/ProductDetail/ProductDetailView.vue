<template>
  <div class="product-detail-root-container">
    <div class="product-detail-main">
      <image-gallery :images="productImages" />

      <div class="product-info">
        <span text-2xl font-bold>{{ product.name }}</span>
        <span text-sm text-gray-400 mt-1>已售{{ product.selledCount }}</span>
        <div flex flex-row flex-wrap gap-2 mt-4>
          <el-tag v-for="(tag, index) in product.tags" :key="index" type="danger" size="large">
            {{ tag }}
          </el-tag>
        </div>
        <span text-gray-500 mt-4>{{ product.description }}</span>
      </div>

      <tab-bar
        mt-10
        :links="sections.map((section: ISection) => ({ id: section.id, label: section.label }))"
      />

      <div class="content-sections">
        <section v-for="section in sections" :id="section.id" :key="section.id">
          <span>{{ section.label }}</span>
          <component :is="section.component" v-bind="section.props" />
        </section>
      </div>
    </div>

    <control-panel :product-id="productId" class="control-panel" />

    <div v-show="isFooterVisible" class="product-detail-footer">
      <el-button flex-1 type="default" size="large" @click="addToFav">收藏产品</el-button>
      <el-button flex-1 type="primary" size="large" @click="isOrderDialogVisiable = true"
        >立即下单</el-button
      >
    </div>

    <order-dialog v-model="isOrderDialogVisiable" :product-id="productId" />
  </div>
</template>

<script setup lang="ts">
import OrderDialog from './OrderDialog.vue'
import ControlPanel from './ControlPanel.vue'
import ImageGallery from './ImageGallery.vue'
import TabBar from '@/components/SectionTabBar.vue'
import DetailsSection from './DetailsSection.vue'
import SafetySection from './SafetySection.vue'
import ReviewsSection from './ReviewsSection.vue'
import SellerSection from './SellerSection.vue'
import RecommendationsSection from './RecommendationsSection.vue'
import type { ISection } from '@/types/section'

const isOrderDialogVisiable = ref(false)

const addToFav = () => {
  console.log(`将 ${productId} 添加到收藏夹`)
}

const route = useRoute()
const productId = ref(route.params.id ? (route.params.id as string) : '')

const productImages = ref([
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/600x400'
])

const sections = ref<ISection[]>([
  {
    id: 'details',
    label: '产品详情',
    component: markRaw(DetailsSection),
    props: { productId: productId.value }
  },
  { id: 'safety', label: '安全保障', component: markRaw(SafetySection), props: {} },
  {
    id: 'reviews',
    label: '客户评价',
    component: markRaw(ReviewsSection),
    props: { productId: productId.value }
  },
  {
    id: 'seller',
    label: '关于商家',
    component: markRaw(SellerSection),
    props: { sellerId: productId.value }
  },
  {
    id: 'recommendations',
    label: '为您推荐',
    component: markRaw(RecommendationsSection),
    props: { productId: productId.value }
  }
])

const product = ref({
  name: '商品名称',
  description: '商品短描述商品短描述商品短描述商品短描述商品短描述商品短描述商品短描述商品短描述',
  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
  selledCount: 100
})

const fetchData = () => {
  // 这里放置获取数据的逻辑
  console.log(`Fetching data for product ID: ${productId.value}`)
}

let observer: IntersectionObserver | null = null
const isFooterVisible = ref(true)

onMounted(() => {
  fetchData()

  const footerElement = document.querySelector('.footer-root-container')

  if (footerElement) {
    const options = {
      root: null, // 以视口为根
      threshold: 0 // 元素可见部分超过 0% 时触发回调
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // footer 进入视口，隐藏 product-detail-footer
          isFooterVisible.value = false
        } else {
          // footer 离开视口，显示 product-detail-footer
          isFooterVisible.value = true
        }
      })
    }, options)

    observer.observe(footerElement)
  } else {
    console.warn('无法找到 .footer-root-container 元素')
  }
})

onUnmounted(() => {
  // 在组件卸载时停止观察
  if (observer) {
    observer.disconnect()
  }
})

watch(
  () => route.params.id,
  (newId) => {
    productId.value = newId as string
    fetchData() // 每当ID变化时重新获取数据
  }
)
</script>

<style scoped lang="scss">
.product-detail-root-container {
  @apply flex flex-row items-start max-w-300 mx-auto px-10;

  .product-detail-main {
    @apply flex-1 pr-8 mt-10 min-w-0;
  }

  .product-info {
    @apply hidden;
  }

  @media (max-width: 75rem) {
    .product-detail-main {
      @apply pr-0;
    }

    .product-info {
      @apply flex flex-col mt-10;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}

.content-sections {
  @apply pt-10;

  section {
    @apply mb-16;
  }

  section > span {
    @apply block relative h-10 text-5 leading-10 font-bold text-dark mb-4 pl-4 bg-slate-100 rounded-r;

    &::before {
      @apply absolute bg-orange-500 h-10 top-0 left-0 w-1 content-[''];
    }
  }
}

.control-panel {
  @media (max-width: 75rem) {
    @apply hidden;
  }
}

.product-detail-footer {
  @apply hidden flex-row items-center px-10 fixed bottom-0 left-0 right-0 h-15 min-w-80 bg-white border-t-1 border-t-solid border-t-gray-200 z-20;

  @media (max-width: 75rem) {
    @apply flex;
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
