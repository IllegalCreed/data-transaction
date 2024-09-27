<template>
  <div class="advertisement-item-root-container">
    <span class="title">{{ advertisement.title }}</span>
    <span class="desc">{{ advertisement.desc }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IHomeAd } from '@/types/advertisement'

defineProps<{ advertisement: IHomeAd }>()
</script>

<style scoped lang="scss">
.advertisement-item-root-container {
  @apply relative min-w-45 flex flex-col items-center gap-8 p-6 pb-12 border-0 border-r-1 border-r-solid shadow-gray-800 shadow;
  border-image: linear-gradient(
      to bottom,
      transparent 20%,
      var(--color-primary) 40%,
      transparent 60%
    )
    1 100%;

  &::before {
    @apply content-[''] absolute left-0 right-0 top-0 bottom-0 rounded bg-gradient-to-br from-[var(--color-light-primary)] to-transparent to-50%;
  }

  .title {
    @apply z-1 text-lg font-semibold text-[var(--color-background)] tracking-widest;
  }

  .desc {
    @apply z-1 text-sm text-[var(--color-background)] tracking-widest leading-loose line-clamp-3 whitespace-pre-wrap;
  }

  @media (max-width: 30rem) {
    @apply min-w-30 p-4 py-8;

    .title {
      @apply text-base tracking-widest;
    }

    .desc {
      @apply text-xs tracking-widest leading-loose;
    }
  }
}
</style>
