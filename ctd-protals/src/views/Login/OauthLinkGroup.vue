<template>
  <div class="oauth-link-group">
    <oauth-link
      v-for="(button, index) in buttons"
      :key="index"
      :icon="button.icon"
      :url="button.url"
    />
  </div>
</template>

<script setup lang="ts">
import OauthLink from './OauthLink.vue'

// 测试数据
const buttons = ref([
  { icon: 'i-fa6-brands:weixin', url: 'https://example.com/oauth2/weixin' },
  { icon: 'i-fa6-brands:qq', url: 'https://example.com/oauth2/qq' },
  { icon: 'i-fa6-brands:alipay', url: 'https://example.com/oauth2/alipay' }
])
</script>

<style scoped lang="scss">
.oauth-link-group {
  @apply flex flex-row space-x-4;
}
</style>
