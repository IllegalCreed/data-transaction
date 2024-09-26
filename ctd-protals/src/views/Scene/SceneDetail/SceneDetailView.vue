<template>
  <div class="scene-detail-root-container">
    <img class="img" :src="scene.imageUrl" />

    <div class="scene-detail-main-container">
      <span class="title">{{ scene.title }}</span>
      <span class="company">{{ scene.companyName }}</span>

      <div class="description">
        <span font-bold text-lg>简介</span>
        <p text-sm>{{ scene.description }}</p>
      </div>

      <div class="content" v-html="sanitizedContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
import type { IScene } from '@/types/scene'

const scene = ref<IScene>({
  id: 1,
  title: '最新测试场景',
  description:
    '在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等',
  companyName: '测试公司名称',
  content: `
        <p>在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。</p>
        <img src="https://via.placeholder.com/300" alt="科技动态" style="display:block;width:80%;height:300px;margin:0 auto"/>
        <p>随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。随着科技的不断发展，许多新兴技术正在改变我们的生活。</p>
        <h3>人工智能的应用</h3>
        <p>人工智能正在各个行业中发挥着重要作用，从医疗到金融。</p>
        <p>点击上面的链接，了解更多关于人工智能的最新动态。</p>
      `,
  imageUrl: 'https://via.placeholder.com/1000'
})

const sanitizedContent = computed(() => {
  return scene.value?.content ? DOMPurify.sanitize(scene.value.content) : ''
})
</script>

<style scoped lang="scss">
.scene-detail-root-container {
  @apply flex flex-col items-center;

  .img {
    @apply w-full h-100 object-cover bg-gray-100 mb-5;

    @media (max-width: 40rem) {
      @apply h-60;
    }
  }

  .scene-detail-main-container {
    @apply flex flex-col items-center max-w-260 min-w-80 px-10;

    .title {
      @apply text-4xl font-bold mt-10;
    }

    .company {
      @apply text-gray-400 text-sm my-5;
    }

    .description {
      @apply bg-gray-100 rounded p-6 mb-5 w-full;
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
