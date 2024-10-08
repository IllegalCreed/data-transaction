<template>
  <el-card max-w-80 body-class="quota-item-body-container" shadow="hover">
    <span class="title">{{ indicator.title }}</span>
    <span class="indicator">{{ indicator.indicator }}</span>
    <span class="desc">{{ indicator.description }}</span>
  </el-card>
</template>

<script setup lang="ts">
import type { IIndicator } from '@/types/consult'

defineProps<{ indicator: IIndicator }>()
</script>

<style lang="scss" scoped>
:deep(.quota-item-body-container) {
  @apply flex flex-col h-full items-center bg-[var(--color-background-alternating)];

  .title {
    @apply text-2xl font-bold text-center;
  }

  .indicator {
    @apply text-[var(--color-primary)] font-bold text-5xl my-5;
  }

  .desc {
    @apply text-sm text-center text-[var(--color-text-lighter)];
  }
}
</style>
