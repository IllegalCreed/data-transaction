<template>
  <div class="security-info-root-container" gap-4>
    <span class="title">安全信息</span>
    <div mt-4 flex>
      <span class="label">最后登录日期：</span> {{ lastLoginDate }}
    </div>
    <div flex><span class="label">登录设备：</span> {{ lastLoginDevice }}</div>
    <div flex>
      <span class="label">登录位置：</span> {{ lastLoginLocation }}
    </div>
  </div>
</template>

<script setup lang="ts">
const lastLoginDate = ref('2024-09-18')
const lastLoginDevice = ref('iPhone 12')
const lastLoginLocation = ref('北京, 中国')
</script>

<style scoped lang="scss">
.security-info-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .label {
    @apply block text-[--color-text-lighter] min-w-30;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
