<template>
  <div class="product-order-detail-review-root-container">
    <span text-lg font-bold>评价信息</span>

    <el-skeleton :loading="getProductOrderReviewActionLoading" animated>
      <template #template>
        <div flex flex-col gap-6>
          <div grid grid-cols-2 gap-6>
            <el-skeleton-item
              v-for="n in 2"
              :key="n"
              variant="p"
            ></el-skeleton-item>
          </div>
          <el-skeleton-item variant="p"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!h-20"></el-skeleton-item>
        </div>
      </template>
      <template #default>
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
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { getProductOrderReview: getProductOrderReviewAction } = orderStore

const { orderId } = defineProps<{
  orderId: number | string
}>()

const {
  state: reviewDetails,
  isLoading: getProductOrderReviewActionLoading,
  execute: executeGetProductOrderReviewAction,
} = useAsyncState(() => getProductOrderReviewAction(orderId), {
  id: 0,
  name: '',
  usefulCount: 0,
  rating: 0,
  createTime: '',
  content: '',
  reply: '',
})

onMounted(() => {
  try {
    executeGetProductOrderReviewAction()
  } catch (error: unknown) {
    console.error(error)
  }
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
