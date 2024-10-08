<template>
  <div class="news-item-root-container" @click="goNewsDetail">
    <div :class="{ today: isToday }" class="time-container">
      <span class="day">{{ formattedDay }}</span>
      <span class="month">{{ formattedYearMonth }}</span>
    </div>
    <div self-stretch flex flex-col justify-between hover:opacity-60>
      <span class="title">{{ news.title }}</span>
      <span class="desc">{{ news.summary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { INewsItem } from '@/types/news'

const { news } = defineProps<{
  news: INewsItem
}>()

const isToday = computed(() => {
  return dayjs(news.createTime).isSame(dayjs(), 'day')
})

const formattedDay = computed(() => {
  return dayjs(news.createTime).format('DD')
})

const formattedYearMonth = computed(() => {
  return dayjs(news.createTime).format('YYYY/MM')
})

const router = useRouter()
const goNewsDetail = () => {
  router.push({
    name: 'news-detail',
    params: {
      id: news.id
    }
  })
}
</script>

<style scoped lang="scss">
.news-item-root-container {
  @apply flex flex-row gap-4 items-center cursor-pointer select-none;

  .time-container {
    @apply flex-shrink-0 flex flex-col items-end justify-center gap-1 w-18 h-18 p-2 rounded border-1 border-solid border-[var(--color-primary)] bg-[var(--color-news-data-background)];

    .day {
      @apply text-2xl text-[var(--color-primary)];
    }

    .month {
      @apply text-xs text-[var(--color-text-light)] tabular-nums font-mono font-italic;
    }

    &.today {
      @apply bg-[var(--color-primary)];

      .day {
        @apply text-white;
      }

      .month {
        @apply text-white;
      }
    }
  }

  .title {
    @apply text-lg line-clamp-1;
  }

  .desc {
    @apply text-xs text-[var(--color-text-light)] line-clamp-2 leading-relaxed tracking-wider;
  }

  @media (max-width: 30rem) {
    .time-container {
      @apply w-16 h-16 p-1;

      .day {
        @apply text-xl;
      }
    }

    .title {
      @apply text-base line-clamp-1;
    }

    .desc {
      @apply text-xs text-[var(--color-text-light)] line-clamp-2 tracking-wider;
    }
  }
}
</style>
