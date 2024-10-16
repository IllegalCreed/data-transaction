<template>
  <div class="order-service-root-container">
    <span text-2xl font-bold>数据服务订单</span>
    <span mt-10>数据服务订单暂无</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.order-service-root-container {
  @apply flex flex-col p-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
