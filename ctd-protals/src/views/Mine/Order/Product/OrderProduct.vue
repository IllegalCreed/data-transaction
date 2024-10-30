<template>
  <div class="order-product-root-container">
    <span text-xl font-bold>数据产品订单</span>

    <div class="search-filter">
      <el-input
        class="search-input"
        v-model="searchQuery"
        placeholder="请输入订单关键字搜索"
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
          placeholder="选择订单状态"
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

    <el-skeleton :loading="getProductOrdersActionLoading" animated>
      <template #template>
        <div flex flex-row flex-wrap gap-8>
          <el-skeleton-item
            v-for="n in 8"
            :key="n"
            variant="rect"
            class="!h-60 !w-100"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <product-panel></product-panel>
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
import ProductPanel from './ProductOrderPanel.vue'
import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { getProductOrders: getProductOrdersAction } = orderStore

const searchQuery = ref('')
const selectedStatus = ref('all')

import {
  PRODUCT_ORDER_STATUS_MAP,
  ProductOrderStatus,
} from '@/types/productOrder'
const orderStatusOptions: { value: string; label: string }[] = Object.values(
  ProductOrderStatus,
).map(value => ({
  value,
  label: PRODUCT_ORDER_STATUS_MAP[value],
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
  isLoading: getProductOrdersActionLoading,
  execute: executeGetProductOrdersAction,
} = useAsyncState(getProductOrdersAction, undefined, {
  immediate: false,
  throwError: true,
})

onMounted(() => {
  try {
    executeGetProductOrdersAction()
  } catch (error: unknown) {
    console.error(error)
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
}
</style>
