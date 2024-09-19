<template>
  <div class="order-product-root-container">
    <span text-2xl font-bold>数据产品订单</span>

    <div class="search-filter">
      <el-input class="search-input" v-model="searchQuery" placeholder="搜索订单" clearable>
        <template #append>
          <el-button>
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>

      <div flex flex-row items-center>
        <span>状态：</span>
        <el-select class="status-select" v-model="selectedStatus" placeholder="选择订单状态">
          <el-option
            v-for="status in orderStatuses"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </div>
    </div>

    <el-divider />

    <product-panel></product-panel>

    <el-pagination
      mt-10
      self-center
      :pager-count="pagerCount"
      :background="showPaginationBackground"
      :total="1000"
      :layout="paginationLayout"
    />
  </div>
</template>

<script setup lang="ts">
import ProductPanel from './ProductPanel.vue'

const searchQuery = ref('')
const selectedStatus = ref('all')

// 状态列表
const orderStatuses = ref([
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待审核' },
  { value: 'contract', label: '合同协商' },
  { value: 'to_deliver', label: '待交付' },
  { value: 'to_check', label: '待验查' },
  { value: 'pending_review', label: '待评价' },
  { value: 'reviewed', label: '已评价' }
])

// 分页组件设置
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
.order-product-root-container {
  @apply flex flex-col p-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }

  .search-filter {
    @apply flex flex-row items-center justify-between w-full gap-4 mt-10;

    .search-input {
      @apply w-100;
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
}
</style>
