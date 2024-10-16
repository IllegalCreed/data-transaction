<template>
  <div class="reviews-section-root-container">
    <el-skeleton :loading="getProductReviewInfoActionLoading" animated>
      <template #template>
        <el-skeleton-item variant="rect" class="!h-30"></el-skeleton-item>
      </template>
      <template #default>
        <div class="reviews-section-body-container">
          <div class="star-level-container">
            <span class="rating-value">{{ rating }}</span>
            <span class="rating-label">综合星级评价</span>
          </div>
          <div flex flex-col items-start gap-4>
            <div class="filter-container">
              <div
                v-for="filter in reviewInfo.filters"
                :key="filter.key"
                :class="['filter-item', { selected: selectedFilter === filter.key }]"
                @click="selectFilter(filter.key)"
              >
                {{ getFilterLabel(filter.key) }} ({{ filter.count }})
              </div>
            </div>
            <span class="star-level-span">
              <span mr-4>综合星级评价:</span>
              <el-rate
                :model-value="rating"
                size="small"
                disabled
                show-score
                text-color="#ff9900"
              ></el-rate
            ></span>
          </div>
        </div>
      </template>
    </el-skeleton>

    <el-skeleton :loading="getProductReviewsActionLoading" animated flex flex-col mt-10 gap-4>
      <template #template>
        <el-skeleton-item v-for="n in 5" :key="n" variant="rect" class="!h-40"></el-skeleton-item>
      </template>
      <template #default>
        <div flex flex-col mt-10>
          <ReviewItem v-for="item in reviews" :key="item.id" :review="item" />
        </div>
        <div v-if="reviews.length >= 5" mt-4 text-center>
          <el-button class="default-btn" self-center round size="large" @click="viewMoreReviews"
            >查看更多</el-button
          >
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ReviewType } from '@/types/review'
import ReviewItem from './ReviewItem.vue'

const { productId } = defineProps<{
  productId: string
}>()

import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const {
  getProductReviews: getProductReviewsAction,
  getProductReviewInfo: getProductReviewInfoAction
} = productStore

const {
  state: reviewInfo,
  isLoading: getProductReviewInfoActionLoading,
  execute: executeGetProductReviewInfoAction
} = useAsyncState(() => getProductReviewInfoAction(productId), {
  rating: 5,
  filters: [
    {
      key: ReviewType.All,
      count: 0
    },
    {
      key: ReviewType.Positive,
      count: 0
    },
    {
      key: ReviewType.Neutral,
      count: 0
    },
    {
      key: ReviewType.Negative,
      count: 0
    },
    {
      key: ReviewType.Replied,
      count: 0
    }
  ]
})

import { REVIEW_TYPE_MAP } from '@/constants/reviewType'
const getFilterLabel = (key: ReviewType) => REVIEW_TYPE_MAP[key]

const {
  state: reviews,
  isLoading: getProductReviewsActionLoading,
  execute: executeGetProductReviewsAction
} = useAsyncState(() => getProductReviewsAction(productId), [])

const rating = computed(() => reviewInfo.value.rating)
const selectedFilter = ref(ReviewType.All)

onMounted(() => {
  try {
    executeGetProductReviewInfoAction()
    executeGetProductReviewsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

const selectFilter = (key: ReviewType) => {
  selectedFilter.value = key
}

const viewMoreReviews = () => {}
</script>

<style scoped lang="scss">
.reviews-section-root-container {
  @apply flex flex-col;

  .reviews-section-body-container {
    @apply flex flex-row items-center justify-between p-5 shadow bg-[var(--color-background-alternating)];
  }

  .star-level-container {
    @apply flex flex-col items-center pl-5;

    .rating-value {
      @apply text-[var(--color-price)] block text-2xl font-bold mb-4;
    }

    .rating-label {
      @apply text-[var(--color-text-light)] text-sm;
    }
  }

  .star-level-span {
    @apply hidden;
  }

  @media (max-width: 40rem) {
    .star-level-container {
      @apply hidden;
    }

    .star-level-span {
      @apply block text-sm;
    }
  }
}

.filter-container {
  @apply flex flex-row flex-wrap items-center gap-4;

  .filter-item {
    @apply cursor-pointer select-none rounded text-gray-700 text-sm whitespace-nowrap hover:opacity-60;

    &.selected {
      @apply text-[var(--color-primary)];
    }
  }
}
</style>
