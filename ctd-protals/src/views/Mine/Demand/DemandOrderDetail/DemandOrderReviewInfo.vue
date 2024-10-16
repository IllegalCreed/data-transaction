<template>
  <div class="demand-order-detail-review-root-container">
    <span text-xl font-bold>评价信息</span>

    <div class="review-info-container">
      <div>
        <strong>评分：</strong>
        <el-rate :model-value="reviewDetails.rating" size="small" disabled></el-rate>
      </div>
      <div><strong>评价时间：</strong> {{ reviewDetails.createTime }}</div>
    </div>

    <span>{{ reviewDetails.content }}</span>
    <div v-if="reviewDetails.reply" flex flex-col bg-gray-200 p-2 rounded>
      <span font-bold>商家回复</span>
      <span text-sm mt-2>{{ reviewDetails.reply }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orderId: number
}>()

const reviewDetails = ref({
  rating: 5,
  createTime: '2024-04-25 10:30:00',
  content: '消费者名称',
  reply: '商家回复信息'
})
</script>

<style scoped lang="scss">
.demand-order-detail-review-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md gap-4;

  .review-info-container {
    @apply grid grid-cols-2 gap-4;
  }

  .btn {
    @apply mt-4;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;

    .review-info-container {
      @apply grid-cols-1;
    }

    .btn {
      @apply self-start;
    }
  }
}
</style>
