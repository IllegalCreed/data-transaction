<template>
  <el-card body-class="step-item-body-container" w-200 mb-20>
    <img
      src="https://via.placeholder.com/240x240?text=placeholder"
      rounded-3xl
      h-50
      w-50
      object-cover
      mr-20
    />
    <div flex flex-col items-start>
      <div
        class="step-label"
        flex
        justify-center
        items-center
        px-6
        py-2
        rounded-3
        font-bold
        mb-6
        text-orange-500
      >
        {{ stepNumber }}
      </div>
      <span font-bold text-2xl mb-6>{{ title }}</span>
      <div text-base text-gray-500>
        {{ description }}
      </div>
    </div>
  </el-card>
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
  box-shadow: 0 10px 60px 0px rgb(249 115 22 / 0.5);
}

.wrap {
  :global(.step-item-body-container) {
    @apply flex flex-row items-center bg-gray-100 p-10;
  }
}
</style>
