<template>
  <div class="product-root-container">
    <product-header></product-header>

    <product-sort-panel mt-5></product-sort-panel>

    <el-skeleton
      :loading="getProductsActionLoading"
      animated
      self-center
      flex
      flex-col
      justify-center
    >
      <template #template>
        <div class="products-container" gap-4>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-71 !h-131"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="products-container">
          <product-item v-for="(product, index) in products" :key="index" :product="product" />
        </div>
      </template>
    </el-skeleton>

    <div class="pager-panel">
      <el-pagination
        :pager-count="pagerCount"
        :background="showPaginationBackground"
        :total="1000"
        :layout="paginationLayout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductHeader from './ProductHeader/ProductHeader.vue'
import ProductSortPanel from './ProductSortPanel.vue'
import ProductItem from './ProductItem.vue'

import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { filters, sortings, products } = storeToRefs(productStore)
const { getProducts: getProductsAction } = productStore

const paginationLayout = ref('total, prev, pager, next')
const showPaginationBackground = ref(true)
const pagerCount = ref(7)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    paginationLayout.value = 'prev, pager, next'
    showPaginationBackground.value = false
    pagerCount.value = 5
  } else {
    paginationLayout.value = 'total, prev, pager, next'
    showPaginationBackground.value = true
    pagerCount.value = 7
  }
})

watch(
  filters,
  (newValue) => {
    console.log(`Searching with filters: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

watch(
  sortings,
  (newValue) => {
    console.log(`Searching with sort: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const { isLoading: getProductsActionLoading, execute: executeGetProductsAction } = useAsyncState(
  () => getProductsAction(),
  undefined
)

onMounted(() => {
  try {
    executeGetProductsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex flex-col items-center;

  .products-container {
    @apply flex flex-row justify-center self-center flex-wrap mt-5 max-w-320 px-10;
  }

  .pager-panel {
    @apply flex flex-row justify-end mt-10 px-10 max-w-280 w-full;
  }

  @media (max-width: 75rem) {
  }

  @media (max-width: 40rem) {
    .products-container {
      @apply px-2.5 mt-1;
    }

    .pager-panel {
      @apply justify-center;
    }
  }
}
</style>
