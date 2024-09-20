<template>
  <div class="favorite-root-container">
    <common-tabbar v-model="currentPage" :links="links" class="tabbar" />

    <div v-if="currentPage === 'product'" flex flex-row justify-center self-center flex-wrap mt-10>
      <product-item
        class="product-item"
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      >
        <el-button size="small" type="primary" absolute right-1 top-1>移除</el-button>
      </product-item>
    </div>

    <div v-else flex flex-row justify-center self-center flex-wrap mt-10>
      <demand-item
        class="demand-item"
        v-for="(demand, index) in demands"
        :key="index"
        :demand="demand"
      >
        <el-button size="small" type="primary" absolute right-1 top-1>移除</el-button>
      </demand-item>
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
import DemandItem from '@/views/Demand/DemandItem.vue'

import { useProductStore } from '@/stores/modules/product'
const { products } = useProductStore()

import { useDemandStore } from '@/stores/modules/demand'
const { demands } = useDemandStore()

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
  @apply flex flex-col pt-10 pb-20;

  .tabbar {
    @apply self-center w-50;

    @media (max-width: 40rem) {
      @apply self-start m--5 w-[calc(100%+40px)];
    }
  }

  @media (max-width: 40rem) {
    @apply pt-5;
  }
}

.product-item {
  @media (min-width: 40rem) {
    @apply w-58;
  }
}

.demand-item {
  @media (min-width: 40rem) {
    @apply w-78;
  }
}

.pager-panel {
  @apply flex flex-row justify-center mt-10 px-10 max-w-280 w-full;
}
</style>
