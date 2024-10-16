<template>
  <div class="news-root-container">
    <div class="news-header-container">
      <span class="title">政策与资讯</span>

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
      <el-skeleton :loading="getNewsListActionLoading" animated>
        <template #template>
          <div flex flex-col gap-6>
            <el-skeleton-item
              v-for="n in 10"
              :key="n"
              variant="rect"
              class="!h-27"
            ></el-skeleton-item>
          </div>
        </template>
        <template #default>
          <news-item v-for="(item, index) in newsList" :key="index" :news="item" />
        </template>
      </el-skeleton>
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
const newsStore = useNewsStore()
const { newsList } = storeToRefs(newsStore)
const { getNewsList: getNewsListAction } = newsStore

const searchKey = ref('')

const { isLoading: getNewsListActionLoading, execute: executeGetNewsListAction } = useAsyncState(
  getNewsListAction(1, 10),
  undefined
)

onMounted(() => {
  try {
    executeGetNewsListAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

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
    @apply flex flex-col items-center bg-blueGray py-15 px-10 w-full;

    .title {
      @apply text-4xl font-bold text-[var(--color-text-reverse)];
    }

    .search-input {
      @apply mt-20 max-w-240 h-15;

      :deep(.el-input__wrapper) {
        @apply rounded-l-full border-none shadow-none text-base px-10;
      }

      :deep(.el-input-group__append) {
        @apply rounded-r-full w-20 bg-[var(--color-background-alternating)] border-none shadow-none;
      }

      :deep(.el-button) {
        @apply flex items-center justify-center;
      }

      :deep(.el-icon) {
        width: 1.2rem;
        height: 1.2rem;
      }

      :deep(.el-icon svg) {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  .news-list-container {
    @apply flex flex-col w-full max-w-260 gap-10 mt-10 px-10;
  }

  .pager-panel {
    @apply flex flex-row justify-center mt-10 px-10 max-w-280 w-full;
  }

  @media (max-width: 40rem) {
    .news-header-container {
      @apply px-5 py-10;

      .search-input {
        @apply mt-10 h-10;

        :deep(.el-input__wrapper) {
          @apply text-sm px-5;
        }

        :deep(.el-input-group__append) {
          @apply w-15;
        }

        :deep(.el-icon) {
          width: 1rem;
          height: 1rem;
        }

        :deep(.el-icon svg) {
          width: 1rem;
          height: 1rem;
        }
      }
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
