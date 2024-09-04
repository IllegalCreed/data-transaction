<template>
  <div class="news-panel-container" data-aos="fade-up">
    <span text-4xl font-bold self-center>政策与资讯</span>

    <div flex flex-row mt-10 space-x-20>
      <div flex-1 flex flex-col space-y-4>
        <news-item
          class="left-col"
          v-for="news in newsList.slice(0, 5)"
          :key="news.id"
          :data="news"
        />
      </div>
      <div class="right-col" flex-1 flex flex-col space-y-4>
        <news-item v-for="news in newsList.slice(5, 10)" :key="news.id" :data="news" />
      </div>
    </div>

    <span self-center text-base text-slate-400 mt-10 cursor-pointer select-none hover:opacity-60
      >更多</span
    >
  </div>
</template>

<script setup lang="ts">
import NewsItem from './NewsItem.vue'

const newsList = ref<{ title: string; createTime: string; id: string }[]>([])

const fetchNews = async () => {
  newsList.value = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `新闻标题 ${i + 1}`,
    createTime: new Date().toISOString().split('T')[0]
  }))
}

onMounted(() => {
  fetchNews()
})
</script>

<style scoped lang="scss">
.news-panel-container {
  @apply flex flex-col w-full w-260;

  @media (max-width: 75rem) {
    @apply w-136;

    .right-col {
      @apply hidden;
    }
  }

  @media (max-width: 40rem) {
    @apply w-full px-10;

    .right-col {
      @apply hidden;
    }
  }
}
</style>
