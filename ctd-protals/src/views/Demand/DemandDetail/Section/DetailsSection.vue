<template>
  <div flex flex-col>
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
        <div
          class="demand-detail-content"
          v-html="sanitizedContent"
          overflow-hidden
        ></div>

        <div mt-10>
          <h3>附件列表</h3>
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
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
import { getFileIcon } from '@/utils/file'

const { demandId } = defineProps<{
  demandId: string
}>()

import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { getDemandContent: getDemandContentAction } = demandStore

const {
  state: detail,
  isLoading: getDemandContentActionLoading,
  execute: executeGetDemandContentAction,
} = useAsyncState(() => getDemandContentAction(demandId), {
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
</script>

<style lang="scss" scoped>
.demand-detail-content {
  @apply w-full overflow-hidden;

  :deep(p) {
    @apply text-base leading-relaxed indent-lg;
  }

  :deep(img) {
    @apply w-full object-cover my-4;
  }
}

.attachments-container {
  @apply flex flex-row flex-wrap;

  .attachment-item {
    @apply flex flex-col items-center p-4 max-w-50 rounded-2xl hover:opacity-60 cursor-pointer;
  }
}
</style>
