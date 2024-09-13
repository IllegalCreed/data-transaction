<template>
  <div class="reviews-section-root-container">
    <el-card body-class="reviews-section-body-container">
      <div class="star-level-container">
        <span text-orange-500 block text-2xl font-bold mb-4>{{ overallRating }}</span>
        <span text-gray-500 text-sm>综合星级评价</span>
      </div>
      <div flex-1 flex flex-col justify-between>
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
        <div flex flex-row justify-between items-center mt-2>
          <span class="star-level-span">
            <span mr-4>综合星级评价:</span>
            <el-rate :model-value="5" size="small" disabled text-color="#ff9900"></el-rate
          ></span>
          <el-select v-model="selectedSort" placeholder="排序方式" max-w-30>
            <el-option label="热度排序" value="popularity"></el-option>
            <el-option label="时间排序" value="time"></el-option>
          </el-select>
        </div>
      </div>
    </el-card>

    <div flex flex-col mt-4>
      <ReviewItem v-for="(review, index) in reviews" :key="index" :review="review" />
    </div>
    <div v-if="reviews.length >= 5" mt-4 text-center>
      <el-button type="primary" @click="viewMoreReviews">查看更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewItem from './ReviewItem.vue'

const props = defineProps<{
  productId: string
}>()

const overallRating = ref(4.8)
const selectedFilter = ref('all')
const selectedSort = ref('popularity')

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

const viewMoreReviews = () => {
  console.log(`Navigate to more reviews for productId: ${props.productId}`)
  // 导航到更多评论的页面
  // 这里可以使用 router.push 或其他导航方式
}
</script>

<style scoped lang="scss">
.reviews-section-root-container {
  @apply flex flex-col;

  .star-level-container {
    @apply flex flex-col items-center pl-5;
  }

  .star-level-span {
    @apply invisible;
  }

  @media (max-width: 40rem) {
    .star-level-container {
      @apply hidden;
    }

    .star-level-span {
      @apply visible text-sm;
    }
  }

  @media (max-width: 30rem) {
    .star-level-span {
      span {
        @apply hidden;
      }
    }
  }
}

.filter-container {
  @apply flex flex-row flex-wrap items-center self-end gap-2;

  .filter-item {
    @apply cursor-pointer select-none p-2 border-2 border-solid border-transparent rounded text-gray-700 text-xs whitespace-nowrap;

    &.selected {
      @apply border-blue-500 text-blue-500;
    }

    &:hover {
      @apply border-gray-300;
    }
  }

  @media (max-width: 40rem) {
    @apply self-stretch justify-between;
  }

  @media (max-width: 30rem) {
    @apply mb-4;
  }
}

.wrap {
  :global(.reviews-section-body-container) {
    @apply flex flex-row items-center justify-between;
  }
}
</style>
