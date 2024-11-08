<template>
  <div class="mine-demand-root-container">
    <span text-xl font-bold>我发布的需求</span>

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

      <div flex flex-row items-center>
        <span class="label">状态：</span>
        <el-select
          class="status-select"
          v-model="selectedStatus"
          placeholder="选择需求状态"
        >
          <el-option
            v-for="status in orderStatusOptions"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </div>
    </div>

    <el-divider />

    <el-skeleton :loading="getDemandOrdersActionLoading" animated>
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
        <demand-panel v-if="demandOrders.length > 0"></demand-panel>
        <div v-else class="no-data">
          <img :src="bg" alt="暂无数据" />
          <span>暂无订单</span>
        </div>
      </template>
    </el-skeleton>

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
import DemandPanel from './DemandOrderPanel.vue'

import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { demandOrders } = storeToRefs(orderStore)
const { getDemandOrders: getDemandOrdersAction } = orderStore

const bg = new URL('@/assets/placeholder/noOrder.png', import.meta.url).href

const searchQuery = ref('')
const selectedStatus = ref('all')

import { DEMAND_ORDER_STATUS_MAP, DemandOrderStatus } from '@/types/demandOrder'
const orderStatusOptions: { value: string; label: string }[] = Object.values(
  DemandOrderStatus,
).map(value => ({
  value,
  label: DEMAND_ORDER_STATUS_MAP[value],
}))
orderStatusOptions.unshift({
  value: 'all',
  label: '全部',
})

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

const {
  isLoading: getDemandOrdersActionLoading,
  execute: executeGetDemandOrdersAction,
} = useAsyncState(getDemandOrdersAction, undefined, {
  immediate: false,
  throwError: true,
})

onMounted(() => {
  try {
    executeGetDemandOrdersAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.mine-demand-root-container {
  @apply flex flex-col p-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }

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
}
</style>
