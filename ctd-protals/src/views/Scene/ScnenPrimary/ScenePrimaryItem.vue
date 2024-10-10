<template>
  <div ref="root" class="scene-primary-item-root-container">
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

const root = useTemplateRef('root')

const numberOfLines = 5
useWave(root, {
  numberOfLines,
  amplitude: Array.from({ length: numberOfLines }, (_, index) => 15 + index * 2),
  frequency: Array.from({ length: numberOfLines }, (_, index) => 0.01 + index * 0.005),
  opacity: Array.from({ length: numberOfLines }, (_, index) => 0 + index * 0.3),
  speed: Array.from({ length: numberOfLines }, (_, index) => 2 - index * 0.2),
  style: 'position: absolute; bottom: -20px; left: 0;',
  setCanvasSize: (canvasElement: HTMLCanvasElement) => {
    if (canvasElement) {
      const rect = root.value!.getBoundingClientRect()
      canvasElement.width = rect!.width
      canvasElement.height = 100
    }
  }
})
</script>

<style scoped lang="scss">
.scene-primary-item-root-container {
  @apply relative flex flex-col py-10 px-10 shadow-lg rounded-lg bg-gradient-to-br from-[var(--color-module-gradient-from)] to-[var(--color-module-gradient-to)];

  .company {
    @apply text-sm font-bold tracking-widest font-sans text-[var(--color-text-lighter)];
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

  @media (max-width: 40rem) {
    .description {
      @apply w-auto;
    }
  }

  @media (max-width: 23rem) {
    @apply py-5 px-5;
  }
}
</style>
