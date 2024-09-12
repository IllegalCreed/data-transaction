<template>
  <div class="product-root-container">
    <div class="product-header-container">
      <el-input
        class="search-input"
        v-model="searchKey"
        size="large"
        :placeholder="searchPlaceholder"
      >
        <template v-if="showSearchType" #prepend>
          <el-select v-model="searchType" placeholder="Select" size="large" style="width: 115px">
            <el-option label="产品名称" value="1" />
            <el-option label="商家名称" value="2" />
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
      <product-item v-for="(product, index) in products" :key="index" :product="product" />
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
import FilterDialog from '@/components/FilterDialog.vue'
import SortListView from '@/components/SortListView.vue'
import ProductItem from './ProductItem.vue'
import { useProductStore } from '@/stores/modules/product'
import type { ISortValue } from '@/types/sorting'
const { filterSource, sortSource, products } = useProductStore()

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
    // 不再使用 entries，因为 newValue 是普通对象
    console.log(`Searching with filters: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const searchKey = ref('')
const searchType = ref('1')

const showFilterDialog = ref(false)

const searchPlaceholder = ref('')
const showSearchType = ref(true)
const paginationLayout = ref('total, prev, pager, next')
const showPaginationBackground = ref(true)
const pagerCount = ref(7)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    searchType.value = '1'
    showSearchType.value = false
    searchPlaceholder.value = '请输入商品名称'
    paginationLayout.value = 'prev, pager, next'
    showPaginationBackground.value = false
    pagerCount.value = 5
  } else {
    showSearchType.value = true
    searchPlaceholder.value = '请输入'
    paginationLayout.value = 'total, prev, pager, next'
    showPaginationBackground.value = true
    pagerCount.value = 7
  }
})
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex flex-col items-center;

  .product-header-container {
    @apply flex flex-col items-center bg-blueGray p-10 w-full;
  }

  .search-input {
    @apply max-w-160;
  }

  .filter-panel {
    @apply mt-10;
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
    .product-header-container {
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
