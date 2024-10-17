<template>
  <div class="oauth-link-group">
    <oauth-link v-for="(item, index) in links" :key="index" :icon="item.icon" :url="item.url" />
  </div>
</template>

<script setup lang="ts">
import OauthLink from './OauthLink.vue'

import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { links } = storeToRefs(accountStore)
const { getLinks: getLinksAction } = accountStore

onMounted(() => {
  getLinksAction()
})
</script>

<style scoped lang="scss">
.oauth-link-group {
  @apply flex flex-row gap-6;
}
</style>
