<template>
  <div class="product-header-container" :style="{ backgroundImage: `url('${bg}')` }">
    <product-search-input></product-search-input>
    <filter-list-view
      class="filter-panel"
      v-model="filters"
      :source="filterSource"
    ></filter-list-view>
  </div>
</template>

<script setup lang="ts">
import ProductSearchInput from './ProductSearchInput.vue'
import FilterListView from '@/components/FilterListView.vue'

import { useProductStore } from '@/stores/modules/product'
const { filterSource } = useProductStore()

const bg = ref(new URL('@/assets/background/productBackground.png', import.meta.url).href)

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
</script>

<style lang="scss" scoped>
.product-header-container {
  @apply flex flex-col items-center p-10 w-full bg-cover bg-center;

  .filter-panel {
    @apply mt-10 max-w-300 w-full;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .filter-panel {
      @apply hidden;
    }
  }
}
</style>
