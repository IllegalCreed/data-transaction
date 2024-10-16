<template>
  <div class="step-item-container">
    <div class="step-item-bar" :class="{ active: isActive }">
      <div class="step-item-index">{{ index + 1 }}</div>
    </div>
    <span class="step-item-title" :class="{ active: isActive }">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  index: number
  title: string
  isActive: boolean
}>()
</script>

<style scoped lang="scss">
.step-item-container {
  @apply flex-1 flex flex-col items-stretch;

  .step-item-title {
    @apply text-sm mt-4 transition-colors text-center text-[var(--color-primary)] opacity-50;

    &.active {
      @apply opacity-100;
    }
  }

  .step-item-bar {
    @apply relative h-1 rounded-full bg-[var(--color-primary)] transition-colors opacity-50;

    &.active {
      @apply opacity-100;
    }

    .step-item-index {
      @apply absolute top-1/2 translate-y--1/2 left-1/2 translate-x--1/2 w-4 h-4 rounded-full bg-[var(--color-primary)] text-white text-xs text-center;
    }
  }
}
</style>
