<template>
  <div flex flex-col items-center>
    <div class="step-label">
      {{ stepNumber }}
    </div>
    <el-card body-class="step-item-body-container" mt--8>
      <span font-bold text-xl>{{ title }}</span>
      <p class="desc">
        {{ description }}
      </p>

      <img
        src="https://via.placeholder.com/240x240?text=placeholder"
        rounded-3xl
        h-40
        w-40
        object-cover
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stepNumber: string
  title: string
  description: string
}>()
</script>

<style scoped lang="scss">
.step-label {
  @apply flex justify-center items-center w-16 h-16 rounded-full font-bold text-lg bg-gray z-10;
}

.desc {
  @apply text-sm text-gray-500 h-20;
  @media (max-width: 40rem) {
    @apply h-auto;
  }
}

.wrap {
  :global(.step-item-body-container) {
    @apply flex flex-col items-center bg-gray-100 px-5 pt-10 pb-5;
  }
}
</style>
