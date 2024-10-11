<template>
  <div class="product-detail-root-container">
    <div class="product-detail-main">
      <image-gallery :images="productImages" :loading="getProductImagesActionLoading" />

      <product-detail-info
        class="info-panel"
        :productId="productId"
        :baseInfo="productBaseInfo"
        :loading="getProductActionLoading"
      ></product-detail-info>

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

    <control-panel
      :productId="productId"
      :baseInfo="productBaseInfo"
      :loading="getProductActionLoading"
      class="control-panel"
    />

    <product-detail-footer
      :productId="productId"
      :baseInfo="productBaseInfo"
      :loading="getProductActionLoading"
    ></product-detail-footer>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
import ProductDetailInfo from './ProductDetailInfo.vue'
import ImageGallery from './ImageGallery.vue'
import TabBar from '@/components/SectionTabBar.vue'
import DetailsSection from './Section/DetailsSection.vue'
import SafetySection from './Section/SafetySection.vue'
import ReviewsSection from './Section/ReviewsSection.vue'
import SellerSection from './Section/SellerSection.vue'
import RecommendationsSection from './Section/RecommendationsSection.vue'
import ProductDetailFooter from './ProductDetailFooter.vue'
import type { ISection } from '@/types/section'

const route = useRoute()
let productId = route.params.id ? (route.params.id as string) : ''
watch(
  () => route.params.id,
  (newId) => {
    productId = newId as string
    executeGetProductAction()
  }
)

import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { getProduct: getProductAction, getProductImages: getProductImagesAction } = productStore

const {
  state: productBaseInfo,
  isLoading: getProductActionLoading,
  execute: executeGetProductAction
} = useAsyncState(() => getProductAction(productId), {
  title: '',
  soldCount: 0,
  description: '',
  tags: [],
  sellerId: 0,
  hasCount: false,
  specGroups: []
})

const {
  state: productImages,
  isLoading: getProductImagesActionLoading,
  execute: executeGetProductImagesAction
} = useAsyncState(() => getProductImagesAction(productId), [])

onMounted(() => {
  try {
    executeGetProductAction()
    executeGetProductImagesAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

const sections = ref<ISection[]>([
  {
    id: 'details',
    label: '产品详情',
    component: markRaw(DetailsSection),
    props: { productId: productId }
  },
  { id: 'safety', label: '安全保障', component: markRaw(SafetySection), props: {} },
  {
    id: 'reviews',
    label: '客户评价',
    component: markRaw(ReviewsSection),
    props: { productId: productId }
  },
  {
    id: 'seller',
    label: '关于商家',
    component: markRaw(SellerSection),
    props: { sellerId: productId }
  },
  {
    id: 'recommendations',
    label: '为您推荐',
    component: markRaw(RecommendationsSection),
    props: { productId: productId }
  }
])
</script>

<style scoped lang="scss">
.product-detail-root-container {
  @apply self-center flex flex-row items-start max-w-320 px-10;

  .product-detail-main {
    @apply flex-1 pr-8 mt-10 min-w-0;

    .info-panel {
      @apply hidden;
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
    @media (max-width: 65rem) {
      @apply hidden;
    }
  }

  @media (max-width: 82rem) {
    @apply self-stretch;
  }

  @media (max-width: 65rem) {
    @apply flex-col items-stretch w-full;

    .product-detail-main {
      @apply pr-0;

      .info-panel {
        @apply flex flex-col mt-10;
      }
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
