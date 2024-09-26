<template>
  <div class="news-panel-container" data-aos="fade-up">
    <span class="page-title" self-center>政策与资讯</span>

    <div class="main-container">
      <div class="left-news-container">
        <el-skeleton :loading="getNewsListActionLoading" animated>
          <template #template>
            <el-skeleton-item variant="rect" class="!h-70"></el-skeleton-item>
          </template>
          <template #default> </template>
        </el-skeleton>
      </div>
      <div class="right-news-container">
        <el-skeleton :loading="getNewsListActionLoading" animated>
          <template #template>
            <div flex flex-col>
              <el-skeleton-item variant="h1"></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-10></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-10></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-10></el-skeleton-item>
              <el-skeleton-item variant="h1" mt-10></el-skeleton-item>
            </div>
          </template>
          <template #default>
            <news-item v-for="item in newsList?.slice(1, 6)" :key="item.id" :news="item" />
          </template>
        </el-skeleton>
      </div>
    </div>
    <span
      self-center
      text-base
      text-slate-400
      mt-10
      cursor-pointer
      select-none
      hover:opacity-60
      @click="goNews"
      >更多</span
    >
  </div>
</template>

<script setup lang="ts">
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

    .left-news-container {
    }

    .right-news-container {
      @apply flex flex-col space-y-4;
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
