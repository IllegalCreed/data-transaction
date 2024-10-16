<template>
  <el-card class="service-item-container" body-class="service-item-body-container" shadow="hover">
    <div class="icon-container">
      <i :class="service.icon" class="icon"></i>
    </div>
    <div flex-1 flex flex-col>
      <div flex flex-row justify-between>
        <span class="title">{{ service.title }}</span>
        <i-heroicons-outline:arrow-right class="arrow" />
      </div>
      <span class="desc">{{ service.description }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { IService } from '@/types/consult'

defineProps<{
  service: IService
}>()
</script>

<style lang="scss" scoped>
:deep(.service-item-body-container) {
  @apply flex flex-row h-full items-center p-8;

  @media (max-width: 30rem) {
    @apply p-5;
  }
}

.service-item-container {
  @apply cursor-pointer select-none;

  .icon-container {
    @apply w-25 h-25 bg-[var(--color-consult-icon-bg-primary)] rounded-full flex justify-center items-center mr-8;

    .icon {
      @apply w-15 h-15 text-[var(--color-primary)];
    }
  }

  .title {
    @apply relative text-2xl font-bold mb-6;

    &::before {
      @apply content-[''] absolute bottom--3 w-30 h-1 rounded bg-[var(--color-primary)];
    }
  }

  .desc {
    @apply text-base text-[var(--color-text-light)] leading-loose;
  }

  .arrow {
    @apply h-6 w-6 text-gray;
  }

  @media (max-width: 60rem) {
    @apply max-w-120;
  }

  @media (max-width: 40rem) {
    .icon-container {
      @apply hidden;
    }
  }

  @media (max-width: 30rem) {
    .title {
      @apply self-center;
    }
  }
}
</style>
