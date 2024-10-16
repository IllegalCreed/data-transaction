<template>
  <div class="number-input-root-container">
    <div class="control-btn" @click="decrement">
      <i-ic:round-minus></i-ic:round-minus>
    </div>
    <span class="number">{{ model }}</span>

    <div class="control-btn" @click="increment">
      <i-ic:round-plus></i-ic:round-plus>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  step = 1,
  min = -Infinity,
  max = Infinity
} = defineProps<{ step?: number; min?: number; max?: number }>()

const model = defineModel<number>({ default: 1 })

const increment = () => {
  if (model.value + step <= max) {
    model.value += step
  }
}

const decrement = () => {
  if (model.value - step >= min) {
    model.value -= step
  }
}
</script>

<style lang="scss" scoped>
.number-input-root-container {
  @apply flex flex-row items-center;

  .number {
    @apply px-4 select-none;
  }

  .control-btn {
    @apply flex justify-center items-center w-8 h-8 rounded-full border-1 border-solid border-[var(--color-border)] cursor-pointer;
  }
}
</style>
