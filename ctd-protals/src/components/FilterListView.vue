<template>
  <div px-10 py-4 flex flex-col bg-white rounded>
    <filter-item
      v-for="filter in source"
      :key="filter.id"
      :data="filter"
      :modelValue="model[filter.id] || 'all'"
      @update:modelValue="(selectedId) => (model[filter.id] = selectedId)"
    ></filter-item>
  </div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/filter'
import FilterItem from './FilterItem.vue'

defineProps<{
  source: IFilter[]
}>()

const model = defineModel<Record<string, string>>({ required: true })
</script>

<style scoped lang="scss"></style>
