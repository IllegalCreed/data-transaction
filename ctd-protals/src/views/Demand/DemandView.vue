<template>
  <div class="demand-root-container">
    <div class="demand-header-container">
      <div flex flex-row justify-between max-w-260 w-full space-x-2>
        <el-input
          v-model="searchKey"
          size="large"
          placeholder="请输入需求名称"
          class="search-input"
        >
          <template v-if="showSearchType" #prepend>
            <el-select v-model="searchType" placeholder="Select" size="large" style="width: 115px">
              <el-option label="需求名称" value="1" />
            </el-select>
          </template>
          <template #append>
            <el-button>
              <template v-slot:icon>
                <i-vaadin:search></i-vaadin:search>
              </template>
            </el-button>
          </template>
        </el-input>

        <el-button type="primary" size="large">
          <span v-if="!isMobileDevice">发布新需求</span>
          <i-ic:baseline-plus v-else w-6 h-6></i-ic:baseline-plus>
        </el-button>
      </div>

      <div class="filter-panel">
        <filter-list-view v-model="filters" :source="filterSource"></filter-list-view>
      </div>
    </div>

    <div class="sort-panel">
      <sort-list-view v-model="sort" :source="sortSource"></sort-list-view>
      <i-mdi:filter-outline
        w-6
        h-6
        cursor-pointer
        select-none
        class="filter-icon"
        @click="showFilterDialog = true"
      ></i-mdi:filter-outline>
    </div>

    <div flex flex-row justify-center self-center flex-wrap mt-4 max-w-260>
      <demand-item v-for="(demand, index) in demands" :key="index" :demand="demand" />
    </div>

    <div class="pager-panel">
      <el-pagination
        :pager-count="pagerCount"
        :background="showPaginationBackground"
        :total="1000"
        :layout="paginationLayout"
      />
    </div>

    <filter-dialog v-model:show="showFilterDialog" v-model="filters" :source="filterSource" />
  </div>
</template>

<script setup lang="ts">
import FilterListView from '@/components/FilterListView.vue'
import SortListView from '@/components/SortListView.vue'
import DemandItem from './DemandItem.vue'
import { useDemandStore } from '@/stores/modules/demand'
import type { ISortValue } from '@/types/sorting'
const { filterSource, sortSource, demands } = useDemandStore()

const sort = ref<ISortValue>({ sortType: 'comprehensive', order: 'desc' as const })
watch(
  sort,
  (newValue) => {
    console.log(`Searching with sort: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const filters = ref<Record<string, string>>(
  filterSource.reduce(
    (acc, filter) => {
      acc[filter.id] = 'all'
      return acc
    },
    {} as Record<string, string>
  )
)
watch(
  filters,
  (newValue) => {
    console.log(`Searching with filters: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const searchKey = ref('')
const searchType = ref('1')

const showFilterDialog = ref(false)

const showSearchType = ref(true)
const paginationLayout = ref('total, prev, pager, next')
const showPaginationBackground = ref(true)
const pagerCount = ref(7)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    showSearchType.value = false
    paginationLayout.value = 'prev, pager, next'
    showPaginationBackground.value = false
    pagerCount.value = 5
  } else {
    showSearchType.value = true
    paginationLayout.value = 'total, prev, pager, next'
    showPaginationBackground.value = true
    pagerCount.value = 7
  }
})
</script>

<style scoped lang="scss">
.demand-root-container {
  @apply flex flex-col items-center;

  .demand-header-container {
    @apply flex flex-col items-center bg-blueGray p-10 w-full;
  }

  .search-input {
    @apply max-w-160;
  }

  .filter-panel {
    @apply mt-10 max-w-260 w-full;
  }

  .sort-panel {
    @apply flex flex-row items-center justify-between mt-10 max-w-280 w-full px-10;
    .filter-icon {
      @apply hidden text-red-500;
    }
  }

  .pager-panel {
    @apply flex flex-row justify-end mt-10 px-10 max-w-280 w-full;
  }

  @media (max-width: 75rem) {
  }

  @media (max-width: 40rem) {
    .demand-header-container {
      @apply p-4;
    }
    .filter-panel {
      @apply hidden;
    }
    .sort-panel {
      @apply px-4 mt-2;
      .filter-icon {
        @apply block;
      }
    }
    .pager-panel {
      @apply justify-center;
    }
  }
}
</style>
