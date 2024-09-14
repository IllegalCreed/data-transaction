<template>
  <div class="login-ad-panel">
    <el-skeleton :loading="GetAdActionLoading" animated>
      <template #template>
        <div flex flex-col>
          <el-skeleton-item variant="h1" mt-15 class="!w-20"></el-skeleton-item>
          <el-skeleton-item variant="h1" mt-10 class="!w-40"></el-skeleton-item>

          <el-skeleton-item variant="p" mt-15></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" mt-5 class="!w-40"></el-skeleton-item>

          <el-skeleton-item variant="rect" mt-25 class="!h-50"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <span text-4xl leading-relaxed font-bold mt-10 whitespace-pre-line>{{
          adData?.title
        }}</span>
        <p text-lg text-gray-400 mt-10 line-height-loose>
          {{ adData?.desc }}
        </p>
        <div flex-1></div>
        <el-carousel
          :interval="5000"
          arrow="never"
          indicator-position="outside"
          height="12rem"
          autoplay
        >
          <el-carousel-item v-for="item in adData?.carousels" :key="item.id">
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
import type { ILoginAd } from '@/types/ad'
import AdCarouselItem from './AdCarouselItem.vue'
import { useAccountStore } from '@/stores/modules/account'
const { getAd: getAdAction } = useAccountStore()

const {
  state: adData,
  isLoading: GetAdActionLoading,
  execute: executeGetAdAction
} = useAsyncState<ILoginAd | undefined>(getAdAction(), undefined)

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
  @apply flex flex-col w-120 ml-20 bg-gray-200 rounded-3xl p-10;

  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
