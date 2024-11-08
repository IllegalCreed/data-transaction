<template>
  <div class="comment-product-item-root-container">
    <div class="header">
      <span class="time">评价时间：{{ comment.createTime }}</span>
    </div>
    <div class="content">
      <div flex flex-col flex-1>
        <div class="product-container">
          <div flex flex-row flex-1 gap-6>
            <img :src="comment.product.imageUrl" />

            <div flex flex-col items-start gap-2>
              <span class="title">{{ comment.product.name }}</span>
              <el-tag size="small" class="tag">{{ mappedTypes }}</el-tag>
              <div flex-1></div>
              <div class="price">
                {{ `￥${comment.product.price}` }}
              </div>
            </div>
          </div>
          <div flex flex-col gap-2 flex-1>
            <div flex flex-row items-center min-w-45>
              <span class="label">评价：</span>
              <el-rate :model-value="comment.rating" :disabled="true" />
            </div>

            <span class="value">{{ comment.content }}</span>
          </div>
        </div>
        <el-divider v-if="comment.reply" />
        <div class="reply-container" v-if="comment.reply">
          <span class="label">商家回复：</span>
          <span class="value">{{ comment.reply }}</span>
        </div>
      </div>

      <div class="actions-container">
        <el-button class="detail-btn" @click="viewProduct">查看产品</el-button>
        <el-button type="danger" @click="deleteComment"> 删除 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { comment } = defineProps<{
  comment: IProductReview
}>()

import { PRODUCT_TYPE_MAP } from '@/types/productOrder'
import type { IProductReview } from '@/types/review'

const mappedTypes = computed(
  () => PRODUCT_TYPE_MAP[comment.product.type] || '数据集',
)

const router = useRouter()
const viewProduct = () => {
  router.push({
    name: 'product-detail',
    params: {
      id: comment.product.productId,
    },
  })
}

const deleteComment = () => {}
</script>

<style scoped lang="scss">
.comment-product-item-root-container {
  @apply flex flex-col border-solid border border-[var(--color-border)];

  .header {
    @apply flex flex-row items-center justify-between gap-2 px-4 h-10 bg-[var(--color-order-header-background)];

    .time {
      @apply text-sm;

      @media (max-width: 30rem) {
        @apply text-xs;
      }
    }
  }

  .content {
    @apply flex flex-row items-center gap-4 p-4;

    .product-container {
      @apply flex flex-row flex-1 gap-4 items-center;

      img {
        @apply object-contain h-25 w-25 rounded;
      }

      .title {
        @apply text-lg font-bold line-clamp-1;
      }

      .price {
        @apply text-xl text-[--color-price] font-bold;
      }

      @media (max-width: 40rem) {
        @apply flex-col items-start;

        img {
          @apply object-contain h-20 w-20 rounded;
        }

        .tag {
          @apply hidden;
        }
      }
    }

    .reply-container {
      @apply flex flex-col gap-2;
    }

    .actions-container {
      @apply flex flex-col items-end gap-2;

      button {
        @apply ml-0 w-20;
      }

      @media (max-width: 40rem) {
        @apply flex flex-row self-center mt-4;
      }
    }

    @media (max-width: 40rem) {
      @apply flex flex-col items-stretch;
    }
  }

  .label,
  .value {
    @apply text-sm;
  }

  .label {
    @apply font-bold;
  }
}
</style>
