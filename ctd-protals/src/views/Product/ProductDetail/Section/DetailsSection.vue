<template>
  <el-skeleton :loading="getProductContentActionLoading" animated flex flex-col gap-4>
    <template #template>
      <el-skeleton-item v-for="n in 20" :key="n" variant="p"></el-skeleton-item>
    </template>

    <template #default>
      <div class="product-detail-content" v-html="sanitizedContent" overflow-hidden></div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const { productId } = defineProps<{
  productId: string
}>()

import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { getProductContent: getProductContentAction } = productStore

const {
  state: content,
  isLoading: getProductContentActionLoading,
  execute: executeGetProductContentAction
} = useAsyncState(() => getProductContentAction(productId), '')

const sanitizedContent = computed(() => {
  return content.value ? DOMPurify.sanitize(content.value) : ''
})

onMounted(() => {
  try {
    executeGetProductContentAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.product-detail-content {
  @apply w-full overflow-hidden;

  :deep(p) {
    @apply text-base leading-relaxed indent-lg;
  }

  :deep(img) {
    @apply w-full object-cover my-4;
  }
}
</style>
