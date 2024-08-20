<template>
  <div class="sort-container">
    <sort-item v-for="option in options" :key="option.value" :label="option.label" :value="option.value"
      :supportsToggle="option.supportsToggle" :active="isActive(option.value)" @update:sort="updateSort" />
  </div>
</template>

<script setup lang="ts">
import SortItem from './SortItem.vue';

interface SortOption {
  value: string;
  label: string;
  supportsToggle?: boolean;
}

const options: SortOption[] = [
  { value: 'comprehensive', label: '综合', supportsToggle: false },
  { value: 'sales', label: '销量', supportsToggle: false },
  { value: 'time', label: '上架时间', supportsToggle: true },
  { value: 'price', label: '价格', supportsToggle: true }
];

const model = defineModel<ISort>({ required: true })

const updateSort = ({ sortType, order }: ISort) => {
  model.value = { sortType, order };
};

const isActive = (value: string) => {
  return model.value.sortType === value
};
</script>

<style scoped lang="scss">
.sort-container {
  @apply flex space-x-4;
}
</style>
