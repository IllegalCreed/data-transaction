<template>
  <div class="product-detail-root-container">
    <div class="product-detail-main">
      <image-gallery :images="productImages" />

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

    <div class="product-detail-footer">
      <el-button flex-1 type="default" size="large" @click="addToFav">收藏产品</el-button>
      <el-button flex-1 type="primary" size="large" @click="isOrderDialogVisiable = true"
        >立即下单</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
import ImageGallery from './ImageGallery.vue'
import TabBar from '@/components/TabBar.vue'
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
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4'
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

const fetchData = () => {
  // 这里放置获取数据的逻辑
  console.log(`Fetching data for product ID: ${productId.value}`)
}

onMounted(() => {
  fetchData()
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

  @media (max-width: 75rem) {
    .product-detail-main {
      @apply pr-0;
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
  @apply hidden flex-row items-center px-10 fixed bottom-0 left-0 right-0 h-15 min-w-80 bg-white border-t-1 border-t-solid border-t-gray-200;

  @media (max-width: 75rem) {
    @apply flex;
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
