<template>
  <div class="sort-container">
    <sort-item
      v-for="option in source"
      :key="option.id"
      :data="option"
      :active="isActive(option.id)"
      @update:sort="updateSort"
    />
  </div>
</template>

<script setup lang="ts">
import type { ISortItem, ISortValue } from '@/types/sorting'
import SortItem from './SortItem.vue'

defineProps<{
  source: ISortItem[]
}>()

const model = defineModel<ISortValue>({ required: true })

const updateSort = ({ sortType, order }: ISort) => {
  model.value = { sortType, order }
}

const isActive = (id: string) => {
  return model.value.sortType === id
}
</script>

<style scoped lang="scss">
.sort-container {
  @apply flex gap-4;

  @media (max-width: 40rem) {
    @apply gap-1;
  }
}
</style>
