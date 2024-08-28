<template>
  <el-card shadow="always" flex flex-col w-260 bg-white px-2>
    <filter-item
      v-for="filter in source"
      :key="filter.id"
      :data="filter"
      :modelValue="model.get(filter.id) || 'all'"
      @update:modelValue="(selectedId) => model.set(filter.id, selectedId)"
    ></filter-item>
  </el-card>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/filter'
import FilterItem from './FilterItem.vue'

defineProps<{
  source: IFilter[]
}>()

const model = defineModel<Map<string, string>>({ required: true })
</script>

<style scoped lang="scss"></style>
