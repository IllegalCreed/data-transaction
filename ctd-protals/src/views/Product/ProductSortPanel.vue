<template>
  <div class="sort-panel-root-container">
    <sort-list-view v-model="sort" :source="sortSource"></sort-list-view>
    <i-mdi:filter-outline
      w-6
      h-6
      cursor-pointer
      select-none
      class="filter-icon"
      @click="showFilterDialog = true"
    ></i-mdi:filter-outline>

    <filter-dialog v-model:show="showFilterDialog" v-model="filters" :source="filterSource" />
  </div>
</template>

<script setup lang="ts">
import FilterDialog from '@/components/FilterDialog.vue'
import type { ISortValue } from '@/types/sorting'
import { useProductStore } from '@/stores/modules/product'
const { filterSource, sortSource } = useProductStore()

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
  (newValue: Record<string, string>) => {
    console.log(`Searching with filters: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const sort = ref<ISortValue>({ sortType: 'comprehensive', order: 'desc' as const })
watch(
  sort,
  (newValue: ISortValue) => {
    console.log(`Searching with sort: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const showFilterDialog = ref(false)
</script>

<style lang="scss" scoped>
.sort-panel-root-container {
  @apply flex flex-row items-center justify-between mt-10 max-w-280 w-full px-10;
  .filter-icon {
    @apply hidden text-red-500;
  }

  @media (max-width: 40rem) {
    @apply px-4 mt-2;
    .filter-icon {
      @apply block;
    }
  }
}
</style>
