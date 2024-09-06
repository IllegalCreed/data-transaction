<template>
  <div class="ad-carousel-item">
    <img :src="img" w-100 h-100 rounded />
    <span text-2xl font-bold mt-10>{{ title }}</span>
    <p text-sm text-gray-400 mt-4>{{ comment }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  comment: string
  img: string
}>()
</script>

<style scoped lang="scss">
.ad-carousel-item {
  @apply flex flex-col items-stretch rounded-lg;
}
</style>
