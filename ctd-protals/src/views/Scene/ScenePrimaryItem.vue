<template>
  <div class="scene-primary-item-root-container">
    <span class="company">{{ scene.companyName }}</span>
    <span class="title">{{ scene.title }}</span>
    <span class="description">{{ scene.description }}</span>
    <div flex-1></div>
    <el-button class="btn" type="primary" size="large">
      <span> 进入场景 </span>
      <i-solar:round-arrow-right-broken ml-2 w-8 h-8></i-solar:round-arrow-right-broken>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { IScene } from '@/types/scene'

defineProps<{ scene: IScene }>()
</script>

<style scoped lang="scss">
.scene-primary-item-root-container {
  @apply relative flex flex-col py-10 px-10 shadow-lg rounded-lg bg-gradient-to-br from-[var(--color-background-light)] to-[var(--color-blue-light)];

  .company {
    @apply text-sm font-bold tracking-widest font-sans text-gray-500;
  }

  .title {
    @apply text-4xl font-bold tracking-widest font-sans mt-4;
  }

  .description {
    @apply text-sm text-gray-900 font-sans mt-4 w-80% line-clamp-3;
  }

  .btn {
    @apply w-30 mt-8;
  }
}
</style>
