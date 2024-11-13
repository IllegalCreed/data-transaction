<template>
  <div class="product-detail-root-container">
    <product-detail-base-info-panel :data="baseInfo" :loading="getProductLoading" />
    <el-divider />
  </div>
</template>

<script lang="ts" setup>
import { ProductStatus } from '@/constants/mapData/product'
import ProductDetailBaseInfoPanel from './ProductDetailBaseInfoPanel.vue'

const id = useRouteParams<string | number>('id')
watch(id, () => {
  executeGetProductAction()
})
onMounted(() => {
  try {
    executeGetProductAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

import { useProductStore } from '@/stores/modules/product'
const { getProduct: getProductAction } = useProductStore()
const {
  state: baseInfo,
  isLoading: getProductLoading,
  execute: executeGetProductAction
} = useAsyncState(
  () => getProductAction(id.value),
  {
    id: id.value,
    sellerId: 0,
    status: ProductStatus.Approving,
    rating: 0,
    soldCount: 0,
    sellerName: '',
    createTime: '',
    updateTime: ''
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    }
  }
)
</script>

<style lang="scss" scoped>
.product-detail-root-container {
  @apply flex-1 flex flex-col p-4 bg-[var(--background-page-color)];
}
</style>
