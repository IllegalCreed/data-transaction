<template>
  <div class="consult-team-item-container">
    <img :src="data.logo" alt="公司logo" rounded-xl />

    <span class="title" text-lg font-bold my-4>{{ data.name }}</span>
    <span class="desc">{{ data.description }}</span>
    <div flex-1></div>
    <el-divider type="dashed" />
    <el-button self-end type="primary" text>了解更多</el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    logo: string
    name: string
    description: string
  }
}>()
</script>

<style lang="scss" scoped>
.consult-team-item-container {
  @apply flex flex-col items-center;

  img {
    @apply w-50 h-50;
  }

  .title {
    @apply line-clamp-1;
  }

  .desc {
    @apply text-gray-400;
  }

  @media (max-width: 40rem) {
    .desc {
      @apply text-gray-400 h-auto;
    }
  }
}
</style>
