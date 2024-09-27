<template>
  <div class="news-panel-container" data-aos="fade-up">
    <span class="page-title" self-center>政策与资讯</span>

    <div class="main-container">
      <div>
        <el-skeleton :loading="getNewsListActionLoading" animated>
          <template #template>
            <el-skeleton-item variant="rect" class="!h-100"></el-skeleton-item>
          </template>
          <template #default>
            <news-primary-item v-if="newsList?.[0]" :news="newsList?.[0]" />
          </template>
        </el-skeleton>
      </div>
      <div class="right-news-container">
        <el-skeleton :loading="getNewsListActionLoading" animated>
          <template #template>
            <div flex flex-col>
              <el-skeleton-item variant="h1"></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-16></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-16></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-16></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-16></el-skeleton-item>
            </div>
          </template>
          <template #default>
            <news-item v-for="item in newsList?.slice(1, 6)" :key="item.id" :news="item" />
          </template>
        </el-skeleton>
      </div>
    </div>
    <el-button class="default-btn" self-center mt-10 round size="large" @click="goNews"
      >查看更多</el-button
    >
  </div>
</template>

<script setup lang="ts">
import NewsPrimaryItem from './NewsPrimaryItem.vue'
import NewsItem from './NewsItem.vue'

import { useNewsStore } from '@/stores/modules/news'
const newStore = useNewsStore()
const { newsList } = storeToRefs(newStore)
const { getNewsList: getNewsListAction } = newStore

const router = useRouter()
const goNews = () => {
  router.push({
    name: 'news'
  })
}

const { isLoading: getNewsListActionLoading, execute: executeGetNewsListAction } = useAsyncState(
  getNewsListAction(1, 10),
  undefined
)

onMounted(() => {
  try {
    executeGetNewsListAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.news-panel-container {
  @apply flex flex-col w-full max-w-320 px-10;

  .main-container {
    @apply grid grid-cols-2 gap-10 mt-20;

    .right-news-container {
      @apply flex flex-col gap-4;
    }
  }

  @media (max-width: 60rem) {
    .main-container {
      @apply grid-cols-1;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;

    .main-container {
      @apply grid-cols-1;
    }
  }
}
</style>
