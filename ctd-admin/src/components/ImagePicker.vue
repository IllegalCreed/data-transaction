<template>
  <div class="image-picker-root-container">
    <div v-if="model" w-full h-full>
      <img :src="convertFileUrl(model.url)" object-cover w-full h-full />
      <div class="actions-container">
        <span cursor-pointer @click.stop="handleImagePreview()">
          <i-ri:zoom-in-line />
        </span>
        <span cursor-pointer @click.stop="handleImageDownload()">
          <i-material-symbols:download-sharp />
        </span>
        <span cursor-pointer @click.stop="handleImageChange()">
          <i-heroicons-outline:refresh />
        </span>
      </div>
    </div>
    <i-ic:baseline-plus v-else w-6 h-6 @click="handleImageChange" />
  </div>
  <el-image-viewer
    v-if="imagePreviewVisible"
    @close="imagePreviewVisible = false"
    :url-list="imagePreviewUrlList"
    :initial-index="imagePreviewInitIndex"
  />
  <!-- 隐藏的文件输入 -->
  <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="onFileSelected" />
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { convertFileUrl } from '@/utils/convertUrl'
import type { IUploadFile } from '@/types/common'

const model = defineModel<IUploadFile>()

const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

// 图片预览
const imagePreviewVisible = ref(false)
const imagePreviewInitIndex = ref(0)
const imagePreviewUrlList = ref<string[]>([])

const handleImagePreview = () => {
  if (model.value) {
    imagePreviewVisible.value = true
    imagePreviewUrlList.value = [model.value.url]
    imagePreviewInitIndex.value = 0
  }
}
const handleImageDownload = () => {
  if (model.value) {
    downloadFile(model.value.url)
  }
}

const handleImageChange = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    if (model.value && model.value.raw) {
      URL.revokeObjectURL(model.value.url)
    }

    const file = target.files[0]
    model.value = {
      id: uuidv4(),
      name: file.name,
      url: URL.createObjectURL(file),
      raw: file
    }
  }
}

const downloadFile = (url: string) => {
  console.log('download:', url)
}

onBeforeUnmount(() => {
  if (model.value && model.value.raw) {
    URL.revokeObjectURL(model.value.url)
  }
})
</script>

<style lang="scss" scoped>
.image-picker-root-container {
  @apply w-30 h-30 relative flex justify-center items-center overflow-hidden bg-transparent border border-dashed border-[var(--border-color)] rounded cursor-pointer;

  &:hover {
    .actions-container {
      @apply opacity-100;
    }
  }

  .actions-container {
    @apply absolute left-0 top-0 w-full h-full cursor-default flex justify-center items-center opacity-0 text-white text-xl gap-4 bg-[var(--upload-background-color)] transition-opacity;
  }
}
</style>
