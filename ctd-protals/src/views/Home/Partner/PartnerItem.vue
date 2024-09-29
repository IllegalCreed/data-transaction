<template>
  <div class="partner-item-container" @click="goPartner">
    <img :src="partner.imageUrl" />
  </div>
</template>

<script setup lang="ts">
import type { IPartner } from '@/types/home'

const { partner } = defineProps<{ partner: IPartner }>()

const goPartner = () => {
  window.location.href = partner.link
}
</script>

<style scoped lang="scss">
.partner-item-container {
  @apply flex items-center justify-center bg-[var(--color-background-light)] p-4 shadow-md cursor-pointer;

  img {
    @apply h-20 object-contain;
  }
}
</style>
