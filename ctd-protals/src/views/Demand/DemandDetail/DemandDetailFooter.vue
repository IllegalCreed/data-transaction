<template>
  <div v-show="isFooterVisible" class="demand-detail-footer-root-container">
    <el-button flex-1 type="default" size="large" @click="addToFav">收藏需求</el-button>
    <el-button
      flex-1
      type="primary"
      size="large"
      :loading="loading"
      @click="isOrderDialogVisiable = true"
      >承接需求</el-button
    >
  </div>

  <order-dialog v-model="isOrderDialogVisiable" :demandId="demandId" :baseInfo="baseInfo" />
</template>

<script setup lang="ts">
import type { IDemandBaseInfo } from '@/types/demand'
import OrderDialog from './OrderDialog.vue'

defineProps<{
  demandId: string
  baseInfo: IDemandBaseInfo
  loading: boolean
}>()

const isOrderDialogVisiable = ref(false)

let observer: IntersectionObserver | null = null
const isFooterVisible = ref(true)

onMounted(() => {
  const footerElement = document.querySelector('.footer-root-container')

  if (footerElement) {
    const options = {
      root: null,
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isFooterVisible.value = false
        } else {
          isFooterVisible.value = true
        }
      })
    }, options)

    observer.observe(footerElement)
  } else {
    console.warn('无法找到 .footer-root-container 元素')
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const addToFav = () => {}
</script>

<style lang="scss" scoped>
.demand-detail-footer-root-container {
  @apply hidden flex-row items-center px-10 pl-40% fixed bottom-0 left-0 right-0 h-15 min-w-80 bg-[var(--color-background-alternating)] border-t-1 border-t-solid border-t-[var(--color-border)] z-20;

  @media (max-width: 65rem) {
    @apply flex;
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
