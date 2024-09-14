<template>
  <div class="ad-carousel-item">
    <span text-xl font-bold>{{ title }}</span>
    <p text-xs text-gray-400>{{ comment }}</p>
    <div flex-1></div>
    <div flex flex-row items-center justify-between>
      <div flex flex-row items-center>
        <UseImage :src="avatar" class="w-10 h-10 rounded-full">
          <template #loading>
            <div w-10 h-10 rounded-full bg-gray-300></div>
          </template>

          <template #error>
            <div w-10 h-10 rounded-full bg-gray-300></div>
          </template>
        </UseImage>
        <span text-sm text-slate-500 ml-4>{{ name }}</span>
      </div>

      <el-rate :model-value="5" :disabled="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  comment: string
  name: string
  avatar: string
}>()
</script>

<style scoped lang="scss">
.ad-carousel-item {
  @apply flex flex-col items-stretch p-6 h-48 bg-slate-100 rounded-lg;
}
</style>
