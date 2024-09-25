<template>
  <div class="news-item-container" @click="goNewsDetail">
    <span class="title">{{ data.title }}</span>
    <span class="time">{{ data.createTime }}</span>
  </div>
</template>

<script setup lang="ts">
const { data } = defineProps<{
  data: {
    id: string
    title: string
    createTime: string
  }
}>()

const router = useRouter()
const goNewsDetail = () => {
  router.push({
    name: 'news-detail',
    params: {
      id: data.id
    }
  })
}
</script>

<style scoped lang="scss">
.news-item-container {
  @apply flex flex-row items-center border-b-1 border-b-dashed cursor-pointer select-none pb-4;

  .title {
    @apply flex-1 text-base border-gray-500 overflow-hidden whitespace-nowrap text-ellipsis hover:opacity-60;
  }

  .time {
    @apply text-sm text-gray-300 ml-4 font-mono tabular-nums;
  }
}
</style>
