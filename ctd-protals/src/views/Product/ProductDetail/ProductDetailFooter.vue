<template>
  <div v-show="isFooterVisible" class="product-detail-footer-root-container">
    <el-button flex-1 type="default" size="large" @click="addToFav">收藏产品</el-button>
    <el-button flex-1 type="primary" size="large" @click="isOrderDialogVisiable = true"
      >立即下单</el-button
    >
  </div>

  <order-dialog v-model="isOrderDialogVisiable" :product-id="productId" />
</template>

<script setup lang="ts">
import OrderDialog from './OrderDialog.vue'

defineProps<{
  productId: string
}>()

const isOrderDialogVisiable = ref(false)

let observer: IntersectionObserver | null = null
const isFooterVisible = ref(true)

onMounted(() => {
  const footerElement = document.querySelector('.footer-root-container')

  if (footerElement) {
    const options = {
      root: null, // 以视口为根
      threshold: 0 // 元素可见部分超过 0% 时触发回调
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // footer 进入视口，隐藏 product-detail-footer
          isFooterVisible.value = false
        } else {
          // footer 离开视口，显示 product-detail-footer
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
  // 在组件卸载时停止观察
  if (observer) {
    observer.disconnect()
  }
})

const addToFav = () => {}
</script>

<style lang="scss" scoped>
.product-detail-footer-root-container {
  @apply hidden flex-row items-center px-10 pl-40% fixed bottom-0 left-0 right-0 h-15 min-w-80 bg-[var(--color-background-alternating)] border-t-1 border-t-solid border-t-[var(--color-border)] z-20;

  @media (max-width: 65rem) {
    @apply flex;
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
