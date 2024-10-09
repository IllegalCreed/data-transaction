<template>
  <div class="product-header-container" :style="{ backgroundImage: `url('${bg}')` }">
    <product-search-input></product-search-input>
    <filter-list-view
      class="filter-panel"
      v-model="filters"
      :source="filterSource"
      :loading="getFilterSourceActionLoading"
      :placeholderLines="5"
    ></filter-list-view>
  </div>
</template>

<script setup lang="ts">
import ProductSearchInput from './ProductSearchInput.vue'
import FilterListView from '@/components/FilterListView.vue'
import { useProductStore } from '@/stores/modules/product'

const bg = ref(new URL('@/assets/background/productBackground.png', import.meta.url).href)

const productStore = useProductStore()
const { filters, filterSource } = storeToRefs(productStore)
const { getFilterSource: getFilterSourceAction } = productStore

const { isLoading: getFilterSourceActionLoading, execute: executeGetFilterSourceAction } =
  useAsyncState(getFilterSourceAction(), undefined)

onMounted(() => {
  try {
    executeGetFilterSourceAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
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
