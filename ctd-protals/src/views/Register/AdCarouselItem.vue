<template>
  <div class="ad-carousel-item">
    <img :src="img" />
    <span class="title">{{ title }}</span>
    <p class="desc">{{ comment }}</p>
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

  img {
    @apply w-80 h-100 rounded;
  }

  .title {
    @apply text-2xl font-bold mt-10 text-[var(--color-text-reverse)];
  }

  .desc {
    @apply text-sm text-[var(--color-text-reverse)] mt-4;
  }
}
</style>
