<template>
  <div class="review-item-root-container">
    <div flex flex-row items-center mb-4>
      <img class="avatar" :src="props.review.avatar" />
      <div flex flex-col>
        <span class="title">{{ review.name }}</span>
        <el-rate :model-value="review.rating" size="small" disabled text-color="#ff9900"></el-rate>
      </div>
      <div flex-1></div>
      <el-link type="primary" :underline="false" @click="markAsUseful" select-none>
        <template #icon>
          <i-icon-park-outline:good-one></i-icon-park-outline:good-one>
        </template>
        <span>有用（{{ review.usefulCount }}）</span>
      </el-link>
    </div>
    <div class="content">{{ review.content }}</div>
    <div v-if="review.reply" class="reply">
      <span font-semibold mr-2>商家回复：</span>
      <span>{{ review.reply }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IReview } from '@/types/review'

const props = defineProps<{
  review: IReview
}>()

const markAsUseful = () => {}
</script>

<style scoped lang="scss">
.review-item-root-container {
  @apply flex flex-col border-b border-b-dashed border-b-gray-200 pb-4 mb-6;

  .avatar {
    @apply w-12 h-12 rounded-full mr-4;
  }

  .title {
    @apply block text-lg font-bold;
  }

  .content {
    @apply text-gray-800 line-height-relaxed;
  }

  .reply {
    @apply p-4 bg-gray-100 rounded-md mt-4;
  }

  @media (max-width: 30rem) {
    .avatar {
      @apply w-10 h-10 rounded-full mr-2;
    }

    .title {
      @apply text-base;
    }

    .content {
      @apply text-sm line-height-normal;
    }

    .reply {
      @apply p-2 text-sm;
    }
  }
}
</style>
