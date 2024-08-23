<template>
  <div class="review-item-root-container">
    <div flex flex-row items-center mb-4>
      <img :src="props.review.avatar" rounded-full mr-4 />
      <div flex flex-col>
        <span block text-lg font-bold>{{ review.name }}</span>
        <el-rate :model-value="review.rating" size="small" disabled show-score text-color="#ff9900"></el-rate>
      </div>
      <div flex-1></div>
      <el-link type="primary" :underline="false" @click="markAsUseful" select-none>
        <template #icon>
          <i-icon-park-outline:good-one></i-icon-park-outline:good-one>
        </template>
        <span>有用（{{ review.usefulCount }}）</span>
      </el-link>
    </div>
    <div line-height-relaxed>{{ review.content }}</div>
    <div v-if="review.reply" p-4 bg-gray-100 rounded-md mt-4>
      <span font-semibold mr-2 line-height-relaxed>商家回复：</span>
      <span>{{ review.reply }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IReview } from '@/types/review';

const props = defineProps<{
  review: IReview;
}>();

const markAsUseful = () => {
};
</script>

<style scoped lang="scss">
.review-item-root-container {
  @apply flex flex-col border-b border-b-dashed border-b-gray-200 pb-4 mb-6;
}

.review-avatar {
  @apply w-12 h-12;
}



.review-content {
  @apply text-gray-800;
}

.review-reply {
  @apply text-gray-600 text-sm;
}

.review-actions {
  @apply flex items-center mt-2;
}
</style>
