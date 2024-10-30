<template>
  <div class="order-service-root-container">
    <span text-2xl font-bold>数据服务订单</span>
    <div class="no-data">
      <img :src="bg" alt="暂无数据" />
      <span>暂无订单</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const bg = new URL('@/assets/placeholder/noOrder.png', import.meta.url).href
</script>

<style lang="scss" scoped>
.order-service-root-container {
  @apply flex flex-col p-10;

  .no-data {
    @apply flex flex-col items-center justify-center;

    img {
      @apply mt-30 w-full max-w-80;
    }

    span {
      @apply text-[--color-text-lighter] mt-10;
    }
  }

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
