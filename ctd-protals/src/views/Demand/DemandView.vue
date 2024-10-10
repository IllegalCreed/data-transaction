<template>
  <div class="demand-root-container">
    <demand-header></demand-header>

    <demand-sort-panel mt-5></demand-sort-panel>

    <el-skeleton
      :loading="getDemandsActionLoading"
      animated
      self-center
      flex
      flex-col
      justify-center
    >
      <template #template>
        <div class="demands-container" gap-4>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
          <el-skeleton-item variant="rect" class="!w-96 !h-71"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="demands-container">
          <demand-item v-for="(demand, index) in demands" :key="index" :demand="demand" />
        </div>
      </template>
    </el-skeleton>

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
import DemandHeader from './DemandHeader/DemandHeader.vue'
import DemandSortPanel from './DemandSortPanel.vue'
import DemandItem from './DemandItem.vue'

import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { filters, sortings, demands } = storeToRefs(demandStore)
const { getDemands: getDemandsAction } = demandStore

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

watch(
  filters,
  (newValue) => {
    console.log(`Searching with filters: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

watch(
  sortings,
  (newValue) => {
    console.log(`Searching with sort: ${JSON.stringify(newValue, null, 2)}`)
    // 在这里触发搜索逻辑
  },
  { deep: true }
)

const { isLoading: getDemandsActionLoading, execute: executeGetDemandsAction } = useAsyncState(
  () => getDemandsAction(),
  undefined
)

onMounted(() => {
  try {
    executeGetDemandsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.demand-root-container {
  @apply flex flex-col items-center;

  .demands-container {
    @apply flex flex-row justify-center self-center flex-wrap mt-5 max-w-320 px-10;
  }

  .pager-panel {
    @apply flex flex-row justify-end mt-10 px-10 max-w-280 w-full;
  }

  @media (max-width: 75rem) {
  }

  @media (max-width: 40rem) {
    .demands-container {
      @apply px-2.5 mt-1;
    }

    .pager-panel {
      @apply justify-center;
    }
  }
}
</style>
