<template>
  <div class="news-detail-root-container">
    <el-skeleton :loading="getNewsActionLoading" animated flex flex-col items-center gap-10>
      <template #template>
        <el-skeleton-item variant="rect" class="!h-100"></el-skeleton-item>
        <el-skeleton-item variant="h1" class="!w-100"></el-skeleton-item>
        <el-skeleton-item variant="p" class="!w-30"></el-skeleton-item>

        <div class="scene-detail-main-container" gap-4>
          <el-skeleton-item variant="rect" class="!h-50" mb-10></el-skeleton-item>
          <el-skeleton-item v-for="n in 20" :key="n" variant="p"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <img class="img" :src="news.bannerUrl" />

        <div class="news-detail-main-container">
          <span class="title">{{ news.title }}</span>
          <span class="time">{{ formattedCreateTime }}</span>

          <el-divider />

          <div class="summary">
            <span font-bold text-lg>简介</span>
            <p text-sm leading-loose>{{ news.summary }}</p>
          </div>

          <div class="content" v-html="sanitizedContent"></div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const route = useRoute()
const newsId = route.params.id ? (route.params.id as string) : ''

import { useNewsStore } from '@/stores/modules/news'
const newsStore = useNewsStore()
const { getNews: getNewsAction } = newsStore

const {
  state: news,
  isLoading: getNewsActionLoading,
  execute: executeGetNewsAction
} = useAsyncState(() => getNewsAction(newsId), {
  id: '',
  title: '',
  summary: '',
  imageUrl: '',
  bannerUrl: '',
  content: '',
  createTime: ''
})

const sanitizedContent = computed(() => {
  return news.value?.content ? DOMPurify.sanitize(news.value.content) : ''
})

const formattedCreateTime = computed(() => {
  return news.value ? dayjs(news.value.createTime).format('YYYY年MM月DD日 HH:mm:ss') : ''
})

onMounted(() => {
  try {
    executeGetNewsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.news-detail-root-container {
  @apply flex flex-col items-center;

  .img {
    @apply w-full h-100 object-cover bg-gray-100 mb-5;

    @media (max-width: 40rem) {
      @apply h-60;
    }
  }

  .news-detail-main-container {
    @apply flex flex-col items-center w-full max-w-300 px-10;

    .title {
      @apply text-4xl font-bold mt-10;
    }

    .time {
      @apply text-[var(--color-text-light)] text-base mt-5;
    }

    .summary {
      @apply bg-[var(--color-news-detail-desc-background)] p-5 mb-5 w-full;
    }

    .content {
      @apply w-full overflow-hidden;

      :deep(p) {
        @apply text-base leading-relaxed indent-lg;
      }

      :deep(img) {
        @apply w-full object-cover my-4;
      }
    }

    @media (max-width: 40rem) {
      @apply px-5;
    }
  }
}
</style>
