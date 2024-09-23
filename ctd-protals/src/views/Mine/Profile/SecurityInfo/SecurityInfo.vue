<template>
  <div class="security-info-root-container" gap-4>
    <span class="title">安全信息</span>
    <div><strong>最后登录日期：</strong> {{ lastLoginDate }}</div>
    <div><strong>登录设备：</strong> {{ lastLoginDevice }}</div>
    <div><strong>登录位置：</strong> {{ lastLoginLocation }}</div>
  </div>
</template>

<script setup lang="ts">
const lastLoginDate = ref('2024-09-18')
const lastLoginDevice = ref('iPhone 12')
const lastLoginLocation = ref('北京, 中国')
</script>

<style scoped lang="scss">
.security-info-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md;

  .title {
    @apply text-xl font-bold;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
