<template>
  <div class="product-detail-root-container">
    <div flex-1 pr-8 min-w-0>
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

    <control-panel :product-id="productId" />
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
  @apply flex flex-row items-start w-300 mx-auto pt-30;
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
</style>
