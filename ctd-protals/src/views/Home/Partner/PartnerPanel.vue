<template>
  <div class="partner-panel-root-container">
    <span class="page-title" self-center>合作伙伴</span>
    <el-skeleton :loading="getPartnersActionLoading || getTopPartnersActionLoading" animated>
      <template #template>
        <div class="partner-top-list-container">
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
        </div>
        <div class="partner-list-container">
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-32"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="partner-top-list-container">
          <partner-top-item
            v-for="(item, index) of topPartners"
            :key="item.id"
            :partner="item"
            data-aos="fade-up"
            :data-aos-delay="aosDelay(index)"
          />
        </div>
        <div class="partner-list-container">
          <partner-item
            v-for="(item, index) of partners"
            :key="item.id"
            :partner="item"
            data-aos="fade-up"
            :data-aos-delay="aosDelay(index)"
          />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import PartnerTopItem from './PartnerTopItem.vue'
import PartnerItem from './PartnerItem.vue'

import { useHomeStore } from '@/stores/modules/home'
const homeStore = useHomeStore()
const { partners, topPartners } = storeToRefs(homeStore)
const { getPartners: getPartnersAction, getTopPartners: getTopPartnersAction } = homeStore

const { isLoading: getPartnersActionLoading, execute: executeGetPartnersAction } = useAsyncState(
  getPartnersAction(),
  undefined
)
const { isLoading: getTopPartnersActionLoading, execute: executeGetTopPartnersAction } =
  useAsyncState(getTopPartnersAction(), undefined)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  try {
    executeGetPartnersAction()
    executeGetTopPartnersAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.partner-panel-root-container {
  @apply flex flex-col items-stretch w-full max-w-320 px-10;

  .partner-top-list-container {
    @apply mt-20 grid grid-cols-2 gap-10;
  }

  .partner-list-container {
    @apply mt-10 grid grid-cols-4 gap-10;
  }

  @media (max-width: 75rem) {
    .partner-list-container {
      @apply grid-cols-2;
    }
  }

  @media (max-width: 50rem) {
    .partner-top-list-container {
      @apply grid-cols-1;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }

  @media (max-width: 30rem) {
    .partner-list-container {
      @apply grid-cols-1;
    }
  }
}
</style>
