<template>
  <div class="review-item-root-container">
    <div flex flex-row items-center mb-4>
      <img class="avatar" :src="props.review.avatar" />
      <div flex flex-col>
        <span class="name">{{ review.name }}</span>
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

    <div class="main-container">
      <div class="content">{{ review.content }}</div>
      <div class="time">{{ review.createdAt }}</div>
      <div v-if="review.reply" class="reply">
        <span class="reply-label">商家回复：</span>
        <span>{{ review.reply }}</span>
      </div>
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
  @apply flex flex-col border-b-1 border-b-dashed border-b-[var(--color-border)] mb-5;

  .avatar {
    @apply w-12 h-12 rounded-full mr-4;
  }

  .name {
    @apply block text-lg font-bold;
  }

  .main-container {
    @apply ml-16;

    .content {
      @apply text-[var(--color-text-light)] line-height-relaxed mb-6;
    }

    .time {
      @apply text-sm text-[var(--color-text-lighter)] mb-4;
    }

    .reply {
      @apply flex flex-col gap-4 py-4 text-[var(--color-text-light)] border-t-1 border-t-dashed border-t-[var(--color-border)];

      .reply-label {
        @apply text-[var(--color-text)];
      }
    }
  }

  @media (max-width: 30rem) {
    .avatar {
      @apply w-10 h-10;
    }

    .name {
      @apply text-base;
    }

    .main-container {
      @apply ml-0;

      .content {
        @apply text-sm line-height-normal mb-4;
      }

      .reply {
        @apply text-sm;
      }
    }
  }
}
</style>
