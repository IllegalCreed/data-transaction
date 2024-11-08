<template>
  <div class="favorite-demands-root-container">
    <span text-xl font-bold>需求收藏</span>

    <div class="search-filter">
      <el-input
        class="search-input"
        v-model="searchQuery"
        placeholder="请输入关键字搜索"
        clearable
      >
        <template #append>
          <el-button>
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>

      <el-button type="danger">全部删除</el-button>
    </div>

    <el-divider />

    <el-skeleton :loading="getFavoriteDemandsActionLoading" animated>
      <template #template>
        <div flex flex-col gap-4>
          <el-skeleton-item
            v-for="n in 4"
            :key="n"
            variant="rect"
            class="!h-50"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="demand-list-panel" v-if="favoriteDemands.length > 0">
          <demand-item
            class="demand-item"
            v-for="(demand, index) in favoriteDemands"
            :key="index"
            :demand="demand"
          >
            <i-mingcute:delete-2-line
              class="delete-icon"
              @click.stop="deleteDemand(demand.id)"
            ></i-mingcute:delete-2-line>
          </demand-item>
        </div>

        <div v-else class="no-data">
          <img :src="bg" alt="暂无数据" />
          <span>暂无订单</span>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import DemandItem from '@/views/Demand/DemandItem.vue'
import { useFavoriteStore } from '@/stores/modules/favorite'
const favoriteStore = useFavoriteStore()
const { favoriteDemands } = storeToRefs(favoriteStore)
const { getFavoriteDemands: getFavoriteDemandsAction } = favoriteStore

const searchQuery = ref('')
const bg = new URL('@/assets/placeholder/noOrder.png', import.meta.url).href

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

const {
  isLoading: getFavoriteDemandsActionLoading,
  execute: executeGetFavoriteDemandsAction,
} = useAsyncState(() => getFavoriteDemandsAction(), undefined)

onMounted(() => {
  try {
    executeGetFavoriteDemandsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

const deleteDemand = (id: string | number) => {
  try {
    console.log('删除需求：', id)
  } catch (error: unknown) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.favorite-demands-root-container {
  @apply flex flex-col p-10;

  .search-filter {
    @apply flex flex-row items-center justify-between w-full gap-4 mt-10;

    .search-input {
      @apply w-100 border-1 border-solid border-[--color-border] rounded;

      :deep(.el-input__wrapper) {
        @apply border-none shadow-none text-base;
      }

      :deep(.el-input-group__append) {
        @apply rounded-r-full bg-[var(--color-background-alternating)] border-none shadow-none;
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

    .label {
      @apply text-lg text-[--color-text-lighter];
    }

    .status-select {
      @apply w-30;
    }

    @media (max-width: 60rem) {
      .search-input {
        @apply w-70;
      }
    }

    @media (max-width: 40rem) {
      @apply flex-col items-end;

      .search-input {
        @apply w-full;
      }
    }
  }

  .no-data {
    @apply flex flex-col items-center justify-center;

    img {
      @apply mt-30 w-full max-w-80;
    }

    span {
      @apply text-[--color-text-lighter] mt-10 mb-20;
    }
  }

  .demand-list-panel {
    @apply flex flex-row justify-center flex-wrap;

    @media (min-width: 40rem) {
      .demand-item {
        @apply w-67;
      }
    }
  }

  .delete-icon {
    @apply absolute right-3 top-7 w-8 h-8 text-[--color-logout-text] cursor-pointer;
  }

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
