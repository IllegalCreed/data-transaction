<template>
  <div class="scene-detail-root-container">
    <el-skeleton :loading="getSceneActionLoading" animated flex flex-col items-center gap-10>
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
        <img class="img" :src="scene.bannerUrl" />

        <div class="scene-detail-main-container">
          <span class="title">{{ scene.title }}</span>
          <span class="company">{{ scene.companyName }}</span>

          <el-divider />

          <div class="description">
            <span font-bold text-lg>简介</span>
            <p text-sm leading-relaxed>{{ scene.description }}</p>
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
const sceneId = route.params.id ? (route.params.id as string) : ''

import { useSceneStore } from '@/stores/modules/scene'
const sceneStore = useSceneStore()
const { getScene: getSceneAction } = sceneStore

const {
  state: scene,
  isLoading: getSceneActionLoading,
  execute: executeGetSceneAction
} = useAsyncState(() => getSceneAction(sceneId), {
  id: '',
  title: '',
  companyName: '',
  description: '',
  imageUrl: '',
  bannerUrl: '',
  content: ''
})

const sanitizedContent = computed(() => {
  return scene.value?.content ? DOMPurify.sanitize(scene.value.content) : ''
})

onMounted(() => {
  try {
    executeGetSceneAction()
  } catch (error: unknown) {
    console.error(error)
  }
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
    @apply flex flex-col items-center w-full max-w-300 px-10;

    .title {
      @apply text-4xl font-bold mt-10;
    }

    .company {
      @apply text-[var(--color-text-light)] text-base mt-5;
    }

    .description {
      @apply bg-[var(--color-news-detail-desc-background)] p-5 mb-5 w-full;
    }

    .content {
      @apply w-full overflow-hidden;

      :deep(p) {
        @apply text-base leading-loose;
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
