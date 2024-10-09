<template>
  <div px-10 py-4 flex flex-col bg-white rounded>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div flex flex-col gap-8 py-4>
          <el-skeleton-item
            v-for="(item, index) in placeholderLines"
            :key="index"
            variant="p"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <filter-item
          v-for="filter in source"
          :key="filter.id"
          :data="filter"
          :modelValue="model[filter.id] || 'all'"
          @update:modelValue="(selectedId: string) => (model[filter.id] = selectedId)"
        ></filter-item>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/filter'
import FilterItem from './FilterItem.vue'

defineProps<{
  source: IFilter[]
  loading: boolean
  placeholderLines: number
}>()

const model = defineModel<Record<string, string>>({ required: true })
</script>

<style scoped lang="scss"></style>
