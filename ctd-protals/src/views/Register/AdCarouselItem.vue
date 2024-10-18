<template>
  <div class="ad-carousel-item">
    <img :src="carousel.imageUrl" />
    <span class="title">{{ carousel.title }}</span>
    <p class="desc">{{ carousel.comment }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IRegisterAdCarouselItem } from '@/types/advertisement'

defineProps<{ carousel: IRegisterAdCarouselItem }>()
</script>

<style scoped lang="scss">
.ad-carousel-item {
  @apply flex flex-col items-stretch rounded-lg;

  img {
    @apply w-80 h-80 rounded object-contain;
  }

  .title {
    @apply text-2xl font-bold mt-10 text-[var(--color-text-reverse)];
  }

  .desc {
    @apply text-sm text-[var(--color-text-reverse)] mt-4;
  }
}
</style>
