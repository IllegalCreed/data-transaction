<template>
  <div class="partner-item-container">
    <img :src="data.img" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: { img: string } }>()
</script>

<style scoped lang="scss">
.partner-item-container {
  @apply flex items-center justify-center bg-gray-100 p-4;
}
</style>
