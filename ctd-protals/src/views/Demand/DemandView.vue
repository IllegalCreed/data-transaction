<template>
  <div class="demand-root-container">
    <div flex flex-col items-center bg-blueGray p-10 w-full>
      <el-input v-model="searchKey" size="large" placeholder="请输入" class="max-w-150">
        <template #prepend>
          <el-select v-model="select" placeholder="Select" size="large" style="width: 115px">
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

      <div mt-10>
        <filter-list-view v-model="filters" :source="filterSource"></filter-list-view>
      </div>
    </div>

    <div flex flex-row mt-10 w-260>
      <sort-list-view v-model="sort" :source="sortSource"></sort-list-view>
    </div>

    <div flex flex-row flex-wrap mt-4 w-260>
      <demand-item v-for="(demand, index) in demands" :key="index" :demand="demand" />
    </div>

    <div flex flex-row justify-end mt-10 w-260>
      <el-pagination background :total="1000" layout="total, prev, pager, next" />
    </div>
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

const filters = ref(new Map<string, string>(filterSource.map((filter) => [filter.id, 'all'])))
watch(
  filters,
  (newValue) => {
    const readableFilters = Object.fromEntries(newValue.entries())

    console.log(`Searching with filters: ${JSON.stringify(readableFilters, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const searchKey = ref('')
const select = ref('1')
</script>

<style scoped lang="scss">
.demand-root-container {
  @apply flex flex-col items-center;
}
</style>
