<template>
  <div class="history-record-item" @click="navigateToDetail">
    <div class="icon-container">
      <i :class="iconClass" w-8 h-8></i>
    </div>
    <div flex-1 flex flex-col>
      <div flex flex-row items-center justify-between space-x-4>
        <span class="title">{{ data.title }}</span>
        <el-tag :type="tagType">{{ moduleTag }}</el-tag>
      </div>
      <span class="description">{{ data.description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISearchResult } from '@/types/search'
import { useSearchResult } from './useSearchResult'

const props = defineProps<{ data: ISearchResult }>()
const { iconClass, moduleTag, tagType, navigateToDetail } = useSearchResult(
  props.data,
)
</script>

<style scoped lang="scss">
.history-record-item {
  @apply cursor-pointer my-2 shrink-0 flex flex-row items-center p-4 border-1 border-solid border-[var(--color-border)];

  &:hover {
    @apply bg-[var(--color-primary)] text-[var(--color-text-reverse)];
  }

  .icon-container {
    @apply flex items-center justify-center mr-6;
  }

  .title {
    @apply font-bold text-lg line-clamp-1;
  }

  .description {
    @apply mt-2 text-sm text-[var(--color-text-light)] line-clamp-2;
  }

  &:hover .description {
    @apply text-white;
  }

  @media (max-width: 40rem) {
    .icon-container {
      @apply hidden;
    }
  }
}
</style>
