<template>
  <div class="news-item-root-container" @click="goNewsDetail">
    <span font-bold text-2xl>{{ news.title }}</span>
    <span line-clamp-2 text-base text-gray-500>{{ news.summary }}</span>
    <span text-sm text-gray-300 self-end>{{ news.createTime }}</span>
  </div>
</template>

<script setup lang="ts">
import type { INewsItem } from '@/types/news'

const { news } = defineProps<{ news: INewsItem }>()

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
  @apply flex flex-col gap-2 border-b border-b-dashed border-b-gray-300 pb-4 cursor-pointer hover:opacity-80;
}
</style>
