<template>
  <div class="demand-order-content-root-container">
    <el-skeleton
      :loading="getDemandContentActionLoading"
      animated
      flex
      flex-col
      gap-4
    >
      <template #template>
        <el-skeleton-item
          v-for="n in 20"
          :key="n"
          variant="p"
        ></el-skeleton-item>
      </template>
      <template #default>
        <div flex flex-row items-center gap-4>
          <span class="title">需求详情</span>
          <i-bx:edit
            v-if="
              orderStatus === DemandOrderStatus.Pending ||
              orderStatus === DemandOrderStatus.Bidding
            "
            class="icon"
            @click="handleContentEdit"
          ></i-bx:edit>
        </div>
        <div
          class="content-container"
          v-html="sanitizedContent"
          overflow-hidden
          mt-4
        ></div>

        <el-divider></el-divider>

        <div flex flex-row items-center gap-4>
          <span class="title">附件列表</span>
          <i-bx:edit
            v-if="
              orderStatus === DemandOrderStatus.Pending ||
              orderStatus === DemandOrderStatus.Bidding
            "
            class="icon"
            @click="handleAttachmentEdit"
          ></i-bx:edit>
        </div>

        <div class="attachments-container">
          <a
            class="attachment-item"
            v-for="(attachment, index) in detail.attachments"
            :key="index"
            :href="attachment.url"
            download
          >
            <img :src="getFileIcon(attachment.url)" h-10 w-10 mb-4 />
            <span text-sm max-w-30 line-clamp-1>{{ attachment.name }}</span>
          </a>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
import { getFileIcon } from '@/utils/file'
import { useDemandStore } from '@/stores/modules/demand'
import { DemandOrderStatus } from '@/types/demandOrder'
const demandStore = useDemandStore()
const { getDemandContent: getDemandContentAction } = demandStore

const { orderId } = defineProps<{
  orderId: number | string
  orderStatus: DemandOrderStatus
}>()

const {
  state: detail,
  isLoading: getDemandContentActionLoading,
  execute: executeGetDemandContentAction,
} = useAsyncState(() => getDemandContentAction(orderId), {
  content: '',
  attachments: [],
})

const sanitizedContent = computed(() => {
  return detail.value.content ? DOMPurify.sanitize(detail.value.content) : ''
})

onMounted(() => {
  try {
    executeGetDemandContentAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

const handleContentEdit = () => {}
const handleAttachmentEdit = () => {}
</script>

<style scoped lang="scss">
.demand-order-content-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .content-container {
    @apply w-full overflow-hidden;

    :deep(p) {
      @apply text-base leading-relaxed indent-lg;
    }

    :deep(img) {
      @apply w-full object-cover my-4;
    }
  }

  .attachments-container {
    @apply flex flex-row flex-wrap mt-4;

    .attachment-item {
      @apply flex flex-col items-center p-4 max-w-50 rounded-2xl hover:opacity-60 cursor-pointer;
    }
  }

  .icon {
    @apply w-6 h-6 cursor-pointer text-[var(--color-primary)];
  }
}
</style>
