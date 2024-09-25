<template>
  <div class="news-detail-root-container">
    <img class="img" :src="news.image" alt="新闻图片" v-if="news.image" />

    <div class="news-detail-main-container">
      <span class="title">{{ news.title }}</span>
      <span text-gray-400 text-sm my-5>{{ formattedCreateTime }}</span>
      <div class="summary">
        <span font-bold text-lg>摘要</span>
        <p text-sm>{{ news.summary }}</p>
      </div>

      <div class="content" v-html="sanitizedContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
import type { INews } from '@/types/news'

const news = ref<INews>({
  id: 1,
  title: '最新科技动态',
  summary:
    '探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。',
  content: `
        <p>在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。</p>
        <img src="https://via.placeholder.com/300" alt="科技动态" style="display:block;width:80%;height:300px;margin:0 auto"/>
        <p>随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。</p>
        <h3>人工智能的应用</h3>
        <p>人工智能正在各个行业中发挥着重要作用，从医疗到金融。</p>
        <p>点击上面的链接，了解更多关于人工智能的最新动态。</p>
      `,
  image: 'https://via.placeholder.com/1000',
  createTime: '2024-09-25'
})

const sanitizedContent = computed(() => {
  return news.value?.content ? DOMPurify.sanitize(news.value.content) : ''
})

const formattedCreateTime = computed(() => {
  return news.value ? dayjs(news.value.createTime).format('YYYY年MM月DD日 HH:mm:ss') : ''
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
    @apply flex flex-col items-center max-w-260 min-w-80 px-10;

    .title {
      @apply text-4xl font-bold mt-10;
    }

    .summary {
      @apply bg-gray-100 rounded p-6 mb-5;
    }

    .content {
      @apply w-full;
    }

    @media (max-width: 40rem) {
      @apply px-5;
    }
  }
}
</style>
