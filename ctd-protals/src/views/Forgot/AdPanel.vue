<template>
  <div class="forgot-ad-panel">
    <el-skeleton :loading="geForgotAdsActionLoading" animated>
      <template #template>
        <el-skeleton-item variant="rect" class="!h-120"></el-skeleton-item>
      </template>
      <template #default>
        <el-carousel
          :interval="5000"
          arrow="never"
          indicator-position="outside"
          height="35rem"
          autoplay
        >
          <el-carousel-item v-for="item in carouselItems" :key="item.id">
            <ad-carousel-item :carousel="item" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import AdCarouselItem from './AdCarouselItem.vue'

import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { getForgotAds: getForgotAdsAction } = accountStore

const {
  state: carouselItems,
  isLoading: geForgotAdsActionLoading,
  execute: executeGetForgotAdsAction
} = useAsyncState(getForgotAdsAction(), undefined)

onMounted(() => {
  try {
    executeGetForgotAdsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.forgot-ad-panel {
  @apply flex flex-col justify-center w-120 h-100vh p-20 sticky top-0 bg-[var(--color-primary)];

  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
