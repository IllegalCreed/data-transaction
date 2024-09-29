<template>
  <div class="contact-panel-root-container">
    <span class="link-title">联系我们</span>
    <el-skeleton :loading="getContactActionLoading" animated>
      <template #template>
        <div flex flex-col>
          <el-skeleton-item variant="p" mt-2 class="!max-w-50"></el-skeleton-item>
          <el-skeleton-item variant="p" mt-3 class="!max-w-50"></el-skeleton-item>
          <el-skeleton-item variant="p" mt-3 class="!max-w-50"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div flex flex-row>
          <i-mdi:map-marker class="link-icon" />
          <span class="link-item !hover:no-underline">{{ contact?.address }}</span>
        </div>
        <div flex flex-row>
          <i-mdi:email class="link-icon" />
          <a class="link-item" href="mailto:EMAIL">{{ contact?.email }}</a>
        </div>
        <div flex flex-row>
          <i-mdi:phone class="link-icon" />
          <a class="link-item" href="tel:+1234567890">{{ contact?.phone }}</a>
        </div>
      </template>
    </el-skeleton>
  </div>
  <div class="contact-panel-root-container">
    <i-ic:baseline-wechat class="qrcode-icon" />
    <el-skeleton :loading="getContactActionLoading" animated>
      <template #template>
        <el-skeleton-item variant="rect" class="!w-60 !h-60"></el-skeleton-item>
      </template>
      <template #default>
        <img class="qrcode-img" :src="contact?.wechatUrl" />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useMasterStore } from '@/stores/modules/master'
const masterStore = useMasterStore()
const { contact } = storeToRefs(masterStore)
const { getContact: getContactAction } = masterStore

const { isLoading: getContactActionLoading, execute: executeGetContactAction } = useAsyncState(
  getContactAction(),
  undefined
)

onMounted(() => {
  try {
    executeGetContactAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.contact-panel-root-container {
  @apply flex flex-col;

  .link-title {
    @apply text-2xl font-bold mb-3;
  }

  .link-item {
    @apply my-1 text-base text-gray-700 no-underline hover:underline break-all;
  }

  .link-icon {
    @apply flex-shrink-0 my-2 w-4 h-4 text-gray-700 mr-4;
  }

  .qrcode-container {
    @apply flex flex-col;
  }

  .qrcode-icon {
    @apply mt-12.5 mb-4;
  }

  .qrcode-img {
    @apply max-w-60 shadow;
  }

  @media (max-width: 40rem) {
    .link-title {
      @apply text-lg;
    }

    .link-item {
      @apply text-sm;
    }

    .qrcode-icon {
      @apply mt-12;
    }
  }

  @media (max-width: 30rem) {
    @apply grid-col-span-2;

    .qrcode-icon {
      @apply mt-0;
    }
  }
}
</style>
