<template>
  <div
    flex
    justify-center
    items-center
    min-w-full
    h-150
    :class="[showBackground ? 'bg-slate-300' : 'bg-transparent']"
  >
    <div
      flex
      flex-row
      items-center
      w-260
      :class="[imagePosition === 'right' ? 'flex-row' : 'flex-row-reverse']"
      data-aos="fade-up"
    >
      <div
        :class="['flex-1 flex flex-col', imagePosition === 'right' ? 'mr-20' : 'ml-20 items-end']"
      >
        <span class="text-5xl font-bold">{{ title }}</span>
        <span class="text-gray mt-5 mb-10">{{ description }}</span>

        <div
          v-for="(sellingPoint, index) in sellingPoints"
          :key="index"
          class="flex flex-row items-center text-lg mb-4"
        >
          <i-iconamoon:shield-yes-fill class="text-green-500 mr-2"></i-iconamoon:shield-yes-fill>
          {{ sellingPoint }}
        </div>

        <el-button type="primary" size="large" class="w-25 mt-10">立即咨询</el-button>
      </div>

      <!-- 图片部分 -->
      <img :src="imageUrl" rounded-3xl h-100 w-100 object-cover />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  sellingPoints: string[]
  imageUrl: string
  showBackground?: boolean
  imagePosition?: 'left' | 'right'
}>()
</script>

<style scoped lang="scss"></style>
