<template>
  <div class="register-ad-panel">
    <el-skeleton :loading="getRegisterAdsActionLoading" animated>
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
const { getRegisterAds: getRegisterAdsAction } = accountStore

const {
  state: carouselItems,
  isLoading: getRegisterAdsActionLoading,
  execute: executeGetRegisterAdsAction
} = useAsyncState(getRegisterAdsAction(), undefined)

onMounted(() => {
  try {
    executeGetRegisterAdsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>
<style lang="scss" scoped>
.register-ad-panel {
  @apply flex flex-col justify-center w-120 h-100vh p-20 sticky top-0 bg-[var(--color-primary)];
  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
