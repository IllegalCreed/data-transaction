<template>
  <div class="step-group-container">
    <step-item
      v-for="(step, index) in steps"
      :key="index"
      :index="index"
      :title="step.title"
      :isActive="currentStep >= index"
    ></step-item>
  </div>
</template>

<script setup lang="ts">
import StepItem from './StepItem.vue'

defineProps<{
  steps: Array<{ title: string }>
  currentStep: number
}>()
</script>

<style scoped lang="scss">
.step-group-container {
  @apply flex flex-row items-center space-x-2;
}
</style>
