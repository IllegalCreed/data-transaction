<template>
  <div ref="root" class="home-module-item-root-container">
    <div flex flex-row items-center gap-8>
      <img class="icon" :src="module.iconUrl" />
      <span class="title">{{ module.title }}</span>
    </div>

    <p class="desc">
      {{ module.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IModule } from '@/types/home'

defineProps<{
  module: IModule
}>()

const root = useTemplateRef('root')

useWave(root, {
  numberOfLines: 7,
  amplitudeStep: 2,
  startFrequency: 0.01,
  frequencyStep: 0.002,
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
.home-module-item-root-container {
  @apply relative flex flex-col w-full p-12 shadow rounded overflow-hidden bg-gradient-to-b from-[var(--color-background-light)] to-[var(--color-blue-light)];

  .title {
    @apply text-4xl font-bold tracking-widest font-sans;
  }

  .icon {
    @apply w-26 h-26 object-contain;
  }

  .desc {
    @apply text-base leading-loose text-[var(--color-text-light)] line-clamp-5;
  }

  @media (max-width: 40rem) {
  }
}
</style>
