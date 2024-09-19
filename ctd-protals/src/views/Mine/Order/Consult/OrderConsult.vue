<template>
  <div class="order-consult-root-container">
    <span text-2xl font-bold>咨询代办订单</span>
    <span mt-10>咨询代办订单暂无</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.order-consult-root-container {
  @apply flex flex-col p-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
