<template>
  <div class="product-root-container">
    <product-header></product-header>

    <div class="sort-panel">
      <sort-list-view v-model="sort" :source="sortSource"></sort-list-view>
      <i-mdi:filter-outline
        w-6
        h-6
        cursor-pointer
        select-none
        class="filter-icon"
        @click="showFilterDialog = true"
      ></i-mdi:filter-outline>
    </div>

    <div flex flex-row justify-center self-center flex-wrap mt-4 max-w-260>
      <product-item v-for="(product, index) in products" :key="index" :product="product" />
    </div>

    <div class="pager-panel">
      <el-pagination
        :pager-count="pagerCount"
        :background="showPaginationBackground"
        :total="1000"
        :layout="paginationLayout"
      />
    </div>

    <filter-dialog v-model:show="showFilterDialog" v-model="filters" :source="filterSource" />
  </div>
</template>

<script setup lang="ts">
import ProductHeader from './ProductHeader/ProductHeader.vue'

import type { ISortValue } from '@/types/sorting'
import FilterDialog from '@/components/FilterDialog.vue'
import SortListView from '@/components/SortListView.vue'
import ProductItem from './ProductItem.vue'
import { useProductStore } from '@/stores/modules/product'
const { filterSource, sortSource, products } = useProductStore()

const filters = ref<Record<string, string>>(
  filterSource.reduce(
    (acc, filter) => {
      acc[filter.id] = 'all'
      return acc
    },
    {} as Record<string, string>
  )
)
watch(
  filters,
  (newValue: string) => {
    console.log(`Searching with filters: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const sort = ref<ISortValue>({ sortType: 'comprehensive', order: 'desc' as const })
watch(
  sort,
  (newValue: string) => {
    console.log(`Searching with sort: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const showFilterDialog = ref(false)

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

<style scoped lang="scss">
.product-root-container {
  @apply flex flex-col items-center;

  .sort-panel {
    @apply flex flex-row items-center justify-between mt-10 max-w-280 w-full px-10;
    .filter-icon {
      @apply hidden text-red-500;
    }
  }

  .pager-panel {
    @apply flex flex-row justify-end mt-10 px-10 max-w-280 w-full;
  }

  @media (max-width: 75rem) {
  }

  @media (max-width: 40rem) {
    .sort-panel {
      @apply px-4 mt-2;
      .filter-icon {
        @apply block;
      }
    }
    .pager-panel {
      @apply justify-center;
    }
  }
}
</style>
