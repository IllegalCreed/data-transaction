<template>
  <div class="comment-root-container">
    <common-tabbar v-model="currentPage" :links="links" class="tabbar" />

    <div v-if="currentPage === 'product'" class="comment-list-container">
      <comment-item
        v-for="(item, index) in productReviews"
        :key="index"
        :comment="item"
      ></comment-item>
    </div>

    <div v-else class="comment-list-container">
      <comment-item
        v-for="(item, index) in demandReviews"
        :key="index"
        :comment="item"
      ></comment-item>
    </div>

    <div class="pager-panel">
      <el-pagination
        :pager-count="pagerCount"
        :background="showPaginationBackground"
        :total="1000"
        :layout="paginationLayout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentItem from './CommentItem.vue'
import CommonTabbar from '@/components/CommonTabbar.vue'

import { useCommentStore } from '@/stores/modules/comment'
const { productReviews, demandReviews } = useCommentStore()

const currentPage = ref('product')

const links = ref([
  {
    id: 'product',
    label: '产品'
  },
  { id: 'demand', label: '需求' }
])

const paginationLayout = ref('total, prev, pager, next')
const showPaginationBackground = ref(true)
const pagerCount = ref(7)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    paginationLayout.value = 'prev, pager, next'
    showPaginationBackground.value = false
    pagerCount.value = 5
  } else {
    paginationLayout.value = 'total, prev, pager, next'
    showPaginationBackground.value = true
    pagerCount.value = 7
  }
})
</script>

<style lang="scss" scoped>
.comment-root-container {
  @apply flex flex-col p-10;

  .tabbar {
    @apply self-center w-50;

    @media (max-width: 40rem) {
      @apply self-start m--5 w-[calc(100%+40px)];
    }
  }

  .comment-list-container {
    @apply grid grid-cols-2 mt-10 gap-4;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .comment-list-container {
      @apply grid grid-cols-1;
    }
  }
}

.pager-panel {
  @apply flex flex-row justify-center mt-10 max-w-280 w-full;
}
</style>
