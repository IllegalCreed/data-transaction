<template>
  <div flex flex-col>
    <el-skeleton :loading="getDemandDetailActionLoading" animated flex flex-col gap-4>
      <template #template>
        <el-skeleton-item v-for="n in 20" :key="n" variant="p"></el-skeleton-item>
      </template>

      <template #default>
        <div class="demand-detail-content" v-html="sanitizedContent" overflow-hidden></div>

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

const { demandId } = defineProps<{
  demandId: string
}>()

import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { getDemandDetail: getDemandDetailAction } = demandStore

const {
  state: detail,
  isLoading: getDemandDetailActionLoading,
  execute: executeGetDemandDetailAction
} = useAsyncState(() => getDemandDetailAction(demandId), {
  content: '',
  attachments: []
})

const sanitizedContent = computed(() => {
  return detail.value.content ? DOMPurify.sanitize(detail.value.content) : ''
})

onMounted(() => {
  try {
    executeGetDemandDetailAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'pdf':
      return new URL('@/assets/icon/demand/pdf.png', import.meta.url).href // PDF 图标
    case 'doc':
    case 'docx':
      return new URL('@/assets/icon/demand/word.png', import.meta.url).href // Word 文档图标
    case 'xls':
    case 'xlsx':
      return new URL('@/assets/icon/demand/excel.png', import.meta.url).href // Excel 文档图标
    case 'ppt':
    case 'pptx':
      return new URL('@/assets/icon/demand/ppt.png', import.meta.url).href // PPT 文档图标
    case 'txt':
      return new URL('@/assets/icon/demand/txt.png', import.meta.url).href // 文本文件图标
    case 'jpg':
    case 'jpeg':
    case 'png':
      return new URL('@/assets/icon/demand/pic.png', import.meta.url).href // 图片文件图标
    case 'rar':
    case 'zip':
      return new URL('@/assets/icon/demand/zip.png', import.meta.url).href // 压缩文件图标
    default:
      return new URL('@/assets/icon/demand/common.png', import.meta.url).href // 通用文件图标
  }
}
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
