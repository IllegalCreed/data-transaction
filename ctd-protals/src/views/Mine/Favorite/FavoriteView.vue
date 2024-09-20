<template>
  <div class="favorite-root-container">
    <common-tabbar v-model="currentPage" :links="links" class="tabbar" />

    <div flex flex-row justify-center self-center flex-wrap mt-10>
      <product-item
        class="product-item"
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>

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
import CommonTabbar from '@/components/CommonTabbar.vue'
import ProductItem from '@/views/Product/ProductItem.vue'

import { useProductStore } from '@/stores/modules/product'
const { products } = useProductStore()

const currentPage = ref('product')

const links = ref([
  {
    id: 'product',
    label: '产品'
  },
  { id: 'demand', label: '需求' }
])

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
</script>

<style lang="scss" scoped>
.favorite-root-container {
  @apply flex flex-col p-10;

  .tabbar {
    @apply self-center;

    @media (max-width: 40rem) {
      @apply self-start m--5 w-[calc(100%+40px)];
    }
  }

  @media (max-width: 40rem) {
    @apply p-5;
  }
}

.product-item {
  @media (max-width: 75rem) {
    @apply w-50;
  }
}

.pager-panel {
  @apply flex flex-row justify-end mt-10 px-10 max-w-280 w-full;
}
</style>
