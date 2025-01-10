<template>
  <div class="product-detail-root-container">
    <product-detail-base-info-panel :data="baseInfo" :loading="getProductLoading" />
    <el-divider />
    <product-detail-version-info-panel
      :product-id="id"
      :version="baseInfo.currentVersion"
      :loading="getProductLoading"
    />
    <el-divider />
    <product-detail-price-info-panel
      :product-id="id"
      :version="baseInfo.currentVersion"
      :loading="getProductLoading"
    />
    <el-divider />
    <product-detail-approval-log-panel :product-id="id" :version="baseInfo.currentVersion" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'product-detail'
})

import ProductDetailBaseInfoPanel from './ProductDetailBaseInfoPanel.vue'
import ProductDetailVersionInfoPanel from './ProductDetailVersionInfoPanel.vue'
import ProductDetailPriceInfoPanel from './ProductDetailPriceInfoPanel.vue'
import ProductDetailApprovalLogPanel from './ProductDetailApprovalLogPanel.vue'

const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetProductAction()
// })

onMounted(() => {
  executeGetProductAction()
})

import { ProductStatus } from '@/constants/mapData/product'
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
