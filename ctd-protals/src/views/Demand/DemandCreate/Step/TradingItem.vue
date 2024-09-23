<template>
  <el-card
    body-class="trading-item-body-container"
    :shadow="disabled ? 'never' : 'hover'"
    :class="['trading-item', { selected: isSelected }, { disabled: disabled }]"
  >
    <div flex flex-row items-center>
      <i :class="icon" class="icon"></i>
      <span class="title">{{ title }}</span>
    </div>
    <p class="description">
      {{ description }}
    </p>
    <span class="tag">{{ tag }}</span>
  </el-card>
</template>

<script setup lang="ts">
const { disabled = false } = defineProps<{
  icon: string
  title: string
  description: string
  tag: string
  isSelected: boolean
  disabled?: boolean
}>()
</script>

<style scoped lang="scss">
:deep(.trading-item-body-container) {
  @apply flex flex-col h-full;
}

.trading-item {
  @apply w-120 cursor-pointer;

  &.selected {
    @apply border border-red-500 bg-red-100;
  }

  &.disabled {
    @apply cursor-not-allowed text-gray-200;

    .description {
      @apply text-gray-200;
    }

    .tag {
      @apply text-gray-200;
    }
  }

  .icon {
    @apply mr-4 h-6 w-6;
  }

  .title {
    @apply font-bold text-lg;
  }

  .description {
    @apply text-sm text-slate-500;
  }

  .tag {
    @apply text-xs text-right text-slate-400;
  }

  @media (max-width: 80rem) {
    @apply w-100;
  }

  @media (max-width: 50rem) {
    @apply w-80;
  }

  @media (max-width: 40rem) {
    @apply self-center;
  }

  @media (max-width: 30rem) {
    @apply w-70;
  }
}
</style>
