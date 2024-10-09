<template>
  <div class="demand-root-container">
    <demand-header></demand-header>

    <demand-sort-panel mt-5></demand-sort-panel>

    <div class="demands-container">
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

onMounted(() => {
  getDemandsAction()
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
      @apply px-2.5 mt-2;
    }

    .pager-panel {
      @apply justify-center;
    }
  }
}
</style>
