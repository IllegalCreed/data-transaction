<template>
  <div ref="root" class="ad-carousel-item">
    <span class="title">{{ title }}</span>
    <p class="desc">{{ comment }}</p>
    <div flex-1></div>
    <div flex flex-row items-center justify-between>
      <div flex flex-row items-center>
        <UseImage :src="avatar" class="w-10 h-10 rounded-full">
          <template #loading>
            <div w-10 h-10 rounded-full bg-gray-300></div>
          </template>

          <template #error>
            <div w-10 h-10 rounded-full bg-gray-300></div>
          </template>
        </UseImage>
        <span class="name">{{ name }}</span>
      </div>

      <el-rate :model-value="5" :disabled="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  comment: string
  name: string
  avatar: string
}>()

const root = useTemplateRef('root')

const numberOfLines = 3
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
.ad-carousel-item {
  @apply flex flex-col items-stretch p-6 h-48 rounded bg-gradient-to-b from-[var(--color-module-gradient-from)] to-[var(--color-module-gradient-to)];

  .title {
    @apply text-xl font-bold;
  }

  .desc {
    @apply text-xs text-[var(--color-text-lighter)];
  }

  .name {
    @apply text-sm text-slate-500 ml-4;
  }
}
</style>
