<template>
  <div class="step-item-container">
    <span class="step-item-title" :class="{ active: isActive }">{{ title }}</span>
    <div class="step-item-bar" :class="{ active: isActive }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  isActive: boolean
}>()
</script>

<style scoped lang="scss">
.step-item-container {
  @apply flex-1 flex flex-col items-stretch;

  .step-item-title {
    @apply text-sm mb-1 transition-colors;

    &.active {
      @apply text-red-500;
    }
  }

  .step-item-bar {
    @apply h-1 bg-gray transition-colors;

    &.active {
      @apply bg-red-500;
    }
  }
}
</style>
