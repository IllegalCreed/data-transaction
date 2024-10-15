<template>
  <div class="login-ad-panel">
    <el-skeleton :loading="GetAdActionLoading" animated h-full>
      <template #template>
        <div flex flex-col h-full pb-7.5>
          <el-skeleton-item variant="h1" mt-15 class="!w-30"></el-skeleton-item>
          <el-skeleton-item variant="h1" mt-10 class="!w-70"></el-skeleton-item>

          <el-skeleton-item variant="p" mt-15></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5 class="!w-30"></el-skeleton-item>
          <div flex-1></div>
          <el-skeleton-item variant="rect" class="!h-48"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <span class="title">{{ adData.title }}</span>
        <p class="desc">
          {{ adData.desc }}
        </p>
        <div flex-1></div>
        <el-carousel
          :interval="5000"
          arrow="never"
          indicator-position="outside"
          height="12rem"
          autoplay
        >
          <el-carousel-item v-for="item in adData.carousels" :key="item.id">
            <ad-carousel-item
              :title="item.title"
              :comment="item.comment"
              :avatar="item.avatar"
              :name="item.name"
            />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import type { ILoginAd } from '@/types/advertisement'
import AdCarouselItem from './AdCarouselItem.vue'
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { getAd: getAdAction } = accountStore

const {
  state: adData,
  isLoading: GetAdActionLoading,
  execute: executeGetAdAction
} = useAsyncState<ILoginAd>(getAdAction(), {
  title: '',
  desc: '',
  carousels: []
})

onMounted(async () => {
  try {
    executeGetAdAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>
<style lang="scss" scoped>
.login-ad-panel {
  @apply flex flex-col justify-stretch w-140 bg-[var(--color-primary)] p-20;

  .title {
    @apply text-4xl text-[var(--color-text-reverse)] leading-relaxed font-bold mt-10 whitespace-pre-line;
  }

  .desc {
    @apply text-base text-[var(--color-text-reverse)] mt-10 line-height-loose;
  }

  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
