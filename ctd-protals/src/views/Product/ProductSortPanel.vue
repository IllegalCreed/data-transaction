<template>
  <div class="sort-panel-root-container">
    <sort-list-view v-model="sortings" :source="sortingSource"></sort-list-view>
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
import SortListView from '@/components/SortListView.vue'
import { useProductStore } from '@/stores/modules/product'

const productStore = useProductStore()
const { filters, filterSource, sortings, sortingSource } = storeToRefs(productStore)
const { getSortingSource: getSortingSourceAction } = productStore

const showFilterDialog = ref(false)

onMounted(() => {
  getSortingSourceAction()
})
</script>

<style lang="scss" scoped>
.sort-panel-root-container {
  @apply flex flex-row items-center justify-between max-w-320 w-full px-10;
  .filter-icon {
    @apply hidden text-[var(--color-text-light)];
  }

  @media (max-width: 40rem) {
    @apply px-5 mt-2;
    .filter-icon {
      @apply block;
    }
  }
}
</style>
