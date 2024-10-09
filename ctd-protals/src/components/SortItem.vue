<template>
  <div @click="handleClick" :class="['sort-button', { active: props.active }]">
    {{ data.label }}
    <template v-if="data.supportsToggle">
      <span v-if="order === 'asc'" class="arrow arrow-up">▲</span>
      <span v-else class="arrow arrow-down">▼</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ISortItem } from '@/types/sorting'

const props = withDefaults(
  defineProps<{
    data: ISortItem
    active?: boolean
    order?: 'asc' | 'desc'
  }>(),
  {
    active: false,
    order: 'desc'
  }
)

const order = ref(props.order)

const emit = defineEmits<{
  (e: 'update:sort', value: ISort): void
}>()

const handleClick = () => {
  if (props.data.supportsToggle) {
    order.value = order.value === 'desc' ? 'asc' : 'desc'
  }
  emit('update:sort', { sortType: props.data.id, order: order.value })
}
</script>

<style scoped lang="scss">
.sort-button {
  @apply flex flex-row items-center p-2 cursor-pointer select-none;

  &.active {
    @apply font-bold text-5 text-[var(--color-primary)];
  }

  @media (max-width: 40rem) {
    @apply text-base;

    &.active {
      @apply text-base;
    }
  }

  @media (max-width: 30rem) {
    @apply text-sm;

    &.active {
      @apply font-normal text-sm;
    }
  }
}

.arrow {
  @apply ml-2 text-xs;

  @media (max-width: 40rem) {
    @apply ml-1;
  }
}

.arrow-up {
  @apply text-[var(--color-up-arrow)];
  /* 升序时箭头的样式 */
}

.arrow-down {
  @apply text-[var(--color-down-arrow)];
  /* 降序时箭头的样式 */
}
</style>
