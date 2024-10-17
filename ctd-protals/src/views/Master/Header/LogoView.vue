<template>
  <div flex flex-row items-center gap-4>
    <img :src="icon" alt="logo" h-10 w-10 object-contain />
    <span class="title">文旅数据专区平台</span>
  </div>
</template>

<script setup lang="ts">
const icon = new URL('@/assets/icon/logo.png', import.meta.url).href
</script>

<style scoped lang="scss">
.title {
  @apply text-2xl font-bold tracking-widest text-[var(--color-primary)];

  @media (max-width: 60rem) {
    @apply hidden;
  }
}
</style>
