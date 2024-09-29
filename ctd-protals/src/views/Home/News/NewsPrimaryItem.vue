<template>
  <div
    class="news-primary-item-root-container"
    :style="{
      backgroundImage: news.imageUrl ? `url(${news.imageUrl})` : `url('${bg}')`
    }"
  >
    <div class="main-container">
      <span class="title">{{ news.title }}</span>
      <span class="desc">{{ news.summary }}</span>
      <span class="time">{{ news.createTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { INewsItem } from '@/types/news'
const bg = ref(new URL('@/assets/placeholder/newsItemDefault.png', import.meta.url).href)

defineProps<{ news: INewsItem }>()
</script>

<style scoped lang="scss">
.news-primary-item-root-container {
  @apply relative flex flex-col justify-end w-full h-106 shadow rounded-lg overflow-hidden bg-[var(--color-background-dark)] bg-cover bg-center cursor-pointer select-none;

  .main-container {
    @apply flex flex-col gap-2 w-full py-4 px-6 rounded-lg backdrop-blur bg-gray-500 bg-opacity-50 text-white;

    .title {
      @apply text-xl line-clamp-1;
    }

    .desc {
      @apply text-xs line-clamp-2;
    }

    .time {
      @apply text-xs self-end tabular-nums font-mono font-italic;
    }
  }

  @media (max-width: 30rem) {
    @apply h-60;

    .main-container {
      @apply p-3 gap-1;

      .title {
        @apply text-base line-clamp-1;
      }

      .desc {
        @apply text-xs line-clamp-1;
      }

      .time {
        @apply text-xs self-end tabular-nums font-mono font-italic;
      }
    }
  }
}
</style>
