<template>
  <el-card
    body-class="identity-item-body-container"
    shadow="hover"
    :class="['identity-item', { selected: isSelected }]"
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
defineProps<{
  icon: string
  title: string
  description: string
  tag: string
  isSelected: boolean
}>()
</script>

<style scoped lang="scss">
:deep(.identity-item-body-container) {
  @apply flex flex-col h-full;
}

.identity-item {
  @apply w-120 cursor-pointer;

  &.selected {
    @apply border border-[var(--color-primary)] bg-[var(--color-register-role-background)];
  }

  .icon {
    @apply mr-4 h-6 w-6;
  }

  .title {
    @apply font-bold text-lg;
  }

  .description {
    @apply text-sm text-[var(--color-text)] leading-loose;
  }

  .tag {
    @apply text-xs text-[var(--color-register-roleselect-text)];
  }

  @media (max-width: 40rem) {
    @apply self-center w-full;
  }
}
</style>
