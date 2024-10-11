<template>
  <div class="reviews-section-root-container">
    <div class="reviews-section-body-container">
      <div class="star-level-container">
        <span text-orange-500 block text-2xl font-bold mb-4>{{ overallRating }}</span>
        <span text-gray-500 text-sm>综合星级评价</span>
      </div>
      <div flex flex-col items-start gap-4>
        <div class="filter-container">
          <div
            v-for="filter in filters"
            :key="filter.value"
            :class="['filter-item', { selected: selectedFilter === filter.value }]"
            @click="selectFilter(filter.value)"
          >
            {{ filter.label }} ({{ filter.count }})
          </div>
        </div>
        <span class="star-level-span">
          <span mr-4>综合星级评价:</span>
          <el-rate :model-value="5" size="small" disabled text-color="#ff9900"></el-rate
        ></span>
      </div>
    </div>

    <div flex flex-col mt-4>
      <ReviewItem v-for="(review, index) in reviews" :key="index" :review="review" />
    </div>
    <div v-if="reviews.length >= 5" mt-4 text-center>
      <el-button class="default-btn" self-center round size="large" @click="viewMoreReviews"
        >查看更多</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewItem from './ReviewItem.vue'

defineProps<{
  productId: string
}>()

const overallRating = ref(4.8)
const selectedFilter = ref('all')

const filters = ref([
  { label: '全部', value: 'all', count: 20 },
  { label: '好评', value: 'positive', count: 15 },
  { label: '中评', value: 'neutral', count: 3 },
  { label: '差评', value: 'negative', count: 2 },
  { label: '商家回复', value: 'replied', count: 5 }
])

const selectFilter = (value: string) => {
  selectedFilter.value = value
  // 在此处根据 selectedFilter 进行评论的筛选逻辑
}

const reviews = ref<
  Array<{
    avatar: string
    name: string
    content: string
    reply?: string
    usefulCount: number
    rating: number
  }>
>([
  {
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5
  }
])

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
