<template>
  <div class="comment-item-root-container">
    <div flex flex-row justify-between gap-2>
      <span class="date">{{ comment.createdAt }}</span>
      <el-rate :model-value="comment.rating" size="small" disabled></el-rate>
    </div>
    <p>{{ comment.content }}</p>
    <div v-if="comment.reply" class="reply">
      <span font-bold>商家回复</span>
      <span text-sm mt-2>{{ comment.reply }}</span>
    </div>

    <div flex-1></div>

    <div class="product-info" v-if="comment.type === 'product'">
      <img :src="comment.product.image" alt="产品图片" width="100" />
      <div flex flex-col justify-between w-full>
        <span font-bold>{{ comment.product.title }}</span>
        <span self-end text-red-500 font-bold text-lg>￥{{ comment.product.price }}</span>
      </div>
    </div>
    <div class="demand-info" v-else-if="comment.type === 'demand'">
      <span font-bold>{{ comment.demand.title }}</span>
      <span text-red-500 font-bold text-lg>￥{{ comment.demand.budget }}</span>
    </div>

    <div class="comment-item-actions">
      <el-button size="small" @click="viewDetails"
        >查看{{ comment.type === 'product' ? '产品' : '需求' }}</el-button
      >
      <el-button size="small" type="danger" @click="deleteComment"> 删除 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMyReview } from '@/types/review'

defineProps<{
  comment: IMyReview
}>()

const viewDetails = () => {
  console.log('查看详情')
}

const deleteComment = () => {
  console.log('删除评论')
}
</script>

<style scoped lang="scss">
.comment-item-root-container {
  @apply relative flex flex-col justify-stretch border-solid border border-gray-100 rounded p-5 pb-10 bg-white shadow-md;

  .reply {
    @apply flex flex-col bg-gray-200 p-2 rounded;
  }

  .comment-item-actions {
    @apply absolute flex flex-row items-center justify-end px-4 left-0 bottom-0 right-0 h-10 rounded-b bg-blueGray;
  }
}

.product-info {
  @apply flex flex-row my-4 p-2 gap-4 border-1 border-solid border-gray-100 rounded;

  img {
    @apply h-15 w-15 object-cover rounded;
  }
}

.demand-info {
  @apply flex flex-row justify-between items-center my-4 p-4 border-1 border-solid border-gray-100 rounded;
}
</style>
