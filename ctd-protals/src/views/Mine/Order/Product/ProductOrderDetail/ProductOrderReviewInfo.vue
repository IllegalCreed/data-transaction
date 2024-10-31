<template>
  <div class="product-order-detail-review-root-container">
    <span text-lg font-bold>评价信息</span>

    <div class="review-info-container">
      <div>
        <span class="label">评分：</span>
        <el-rate
          :model-value="reviewDetails.rating"
          size="small"
          disabled
        ></el-rate>
      </div>
      <div>
        <span class="label">评价时间：</span
        ><span class="value">{{ reviewDetails.createTime }}</span>
      </div>
    </div>

    <span>{{ reviewDetails.content }}</span>
    <div v-if="reviewDetails.reply" class="reply">
      <span font-bold>商家回复</span>
      <span text-sm mt-2>{{ reviewDetails.reply }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orderId: number | string
}>()

const reviewDetails = ref({
  rating: 5,
  createTime: '2024-04-25 10:30:00',
  content: '消费者信息',
  reply: '商家回复信息',
})
</script>

<style scoped lang="scss">
.product-order-detail-review-root-container {
  @apply flex flex-col gap-4;

  .review-info-container {
    @apply grid grid-cols-2 gap-4;
  }

  .label {
    @apply text-sm text-[var(--color-text-lighter)];
  }

  .value {
    @apply text-sm text-[var(--color-text)];
  }

  .reply {
    @apply flex flex-col p-4 rounded bg-[var(--color-background)];
  }

  .btn {
    @apply mt-4;
  }

  @media (max-width: 40rem) {
    @apply p-0;

    .review-info-container {
      @apply grid-cols-1;
    }

    .btn {
      @apply self-start;
    }
  }
}
</style>
