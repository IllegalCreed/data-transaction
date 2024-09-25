<template>
  <div class="news-root-container">
    <div class="news-header-container">
      <span text-4xl font-bold>政策与资讯</span>

      <el-input v-model="searchKey" class="search-input" size="large" placeholder="请输入文章名称">
        <template #append>
          <el-button>
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>
    </div>

    <div class="news-list-container">
      <news-item v-for="(item, index) in newsList" :key="index" :news="item" />
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
import NewsItem from './NewsItem.vue'
import { useNewsStore } from '@/stores/modules/news'

const { newsList } = useNewsStore()

const searchKey = ref('')

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

<style scoped lang="scss">
.news-root-container {
  @apply flex flex-col items-center;

  .news-header-container {
    @apply flex flex-col items-center bg-blueGray p-10 w-full;

    .search-input {
      @apply mt-10 max-w-160;
    }
  }

  .news-list-container {
    @apply flex flex-col w-full max-w-180 gap-10 mt-20 px-10;
  }

  .pager-panel {
    @apply flex flex-row justify-center mt-10 px-10 max-w-280 w-full;
  }

  @media (max-width: 40rem) {
    .news-header-container {
      @apply p-4;
    }

    .news-list-container {
      @apply px-5;
    }

    .pager-panel {
      @apply justify-center;
    }
  }
}
</style>
