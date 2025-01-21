<template>
  <div class="image-array-picker-root-container">
    <div v-for="(item, index) in model" class="item-container" :key="index">
      <img :src="item.url" object-cover w-full h-full />
      <div class="actions-container">
        <span cursor-pointer @click.stop="handleImagePreview(index)">
          <i-ri:zoom-in-line />
        </span>
        <span cursor-pointer @click.stop="handleImageDownload(item.url)">
          <i-material-symbols:download-sharp />
        </span>
        <span cursor-pointer @click.stop="handleImageDelete(index)">
          <i-material-symbols:delete-outline />
        </span>
      </div>
    </div>

    <div class="add-container" @click="handleImageAdd">
      <i-ic:baseline-plus w-6 h-6 />
    </div>
  </div>
  <el-image-viewer
    v-if="imagePreviewVisible"
    @close="imagePreviewVisible = false"
    :url-list="imagePreviewUrlList"
    :initial-index="imagePreviewInitIndex"
  />
  <!-- 隐藏的文件输入 -->
  <input
    type="file"
    ref="fileInput"
    accept="image/*"
    multiple
    class="hidden"
    @change="onFileSelected"
  />
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import type { IUploadFile } from '@/types/common'

const model = defineModel<IUploadFile[]>({ default: () => [] })

const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

// 图片预览
const imagePreviewVisible = ref(false)
const imagePreviewInitIndex = ref(0)
const imagePreviewUrlList = ref<string[]>([])

const handleImagePreview = (index: number) => {
  imagePreviewVisible.value = true
  imagePreviewUrlList.value = model.value.map((item) => item.url)
  imagePreviewInitIndex.value = index
}
const handleImageDownload = (url: string) => {
  downloadFile(url)
}

const handleImageDelete = (index: number) => {
  const item = model.value[index]
  if (item) {
    if (item.raw) {
      URL.revokeObjectURL(item.url)
    }
    model.value.splice(index, 1)
  }
}

const handleImageAdd = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    for (const item of files) {
      model.value.push({
        id: uuidv4(),
        name: item.name,
        url: URL.createObjectURL(item),
        raw: item
      })
    }
  }
  target.value = ''
}

const downloadFile = (url: string) => {
  console.log('download:', url)
}

onBeforeUnmount(() => {
  model.value.forEach((item) => {
    if (item.raw) {
      URL.revokeObjectURL(item.url)
    }
  })
})
</script>

<style lang="scss" scoped>
.image-array-picker-root-container {
  @apply flex flex-row flex-wrap gap-4;

  .add-container {
    @apply w-30 h-30 relative flex justify-center items-center overflow-hidden bg-transparent border border-dashed border-[var(--border-color)] rounded cursor-pointer;
  }

  .item-container {
    @apply w-30 h-30 relative flex justify-center items-center overflow-hidden bg-transparent border border-dashed border-[var(--border-color)] rounded;
    &:hover {
      .actions-container {
        @apply opacity-100;
      }
    }

    .actions-container {
      @apply absolute left-0 top-0 w-full h-full cursor-default flex justify-center items-center opacity-0 text-white text-xl gap-4 bg-[var(--upload-background-color)] transition-opacity;
    }
  }
}
</style>
