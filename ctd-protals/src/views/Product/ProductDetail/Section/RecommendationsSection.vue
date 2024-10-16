<template>
  <el-skeleton :loading="getRecommendProductsActionLoading" animated>
    <template #template>
      <div class="recommendations-section-root-container" gap-4>
        <el-skeleton-item
          v-for="n in 6"
          :key="n"
          variant="rect"
          class="!w-60 !h-120"
        ></el-skeleton-item>
      </div>
    </template>
    <template #default>
      <div class="recommendations-section-root-container">
        <ProductItem
          class="recommend-product-item"
          v-for="(product, index) in recommendedProducts"
          :key="index"
          :product="product"
        />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import ProductItem from '../../ProductItem.vue'

const { productId } = defineProps<{
  productId: string
}>()
watch(
  () => productId,
  () => {
    executeGetRecommendProductsAction()
  }
)

import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { getRecommendProducts: getRecommendProductsAction } = productStore

const {
  state: recommendedProducts,
  isLoading: getRecommendProductsActionLoading,
  execute: executeGetRecommendProductsAction
} = useAsyncState(() => getRecommendProductsAction(productId), undefined)

onMounted(() => {
  try {
    executeGetRecommendProductsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.recommendations-section-root-container {
  @apply flex flex-row justify-center flex-wrap;

  @media (min-width: 65rem) {
    .recommend-product-item {
      @apply w-60;
    }
  }

  @media (max-width: 40rem) {
    @apply mx--2;
  }
}
</style>
