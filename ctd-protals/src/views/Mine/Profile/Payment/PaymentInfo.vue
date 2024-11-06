<template>
  <div class="payment-info-root-container">
    <span class="title">支付日志</span>

    <el-skeleton :loading="getPaymentLogsActionLoading" animated>
      <template #template>
        <div flex flex-col gap-4 mt-4>
          <el-skeleton-item
            v-for="n in 4"
            :key="n"
            variant="rect"
            class="!h-24"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="payment-list">
          <payment-item
            v-for="item in paymentLogs"
            :key="item.id"
            :paymentLog="item"
          >
          </payment-item>
        </div>
        <div class="pager-panel">
          <el-pagination
            :pager-count="pagerCount"
            :background="showPaginationBackground"
            :total="1000"
            :layout="paginationLayout"
          />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import PaymentItem from './PaymentItem.vue'
import { usePaymentStore } from '@/stores/modules/payment'
const paymentStore = usePaymentStore()
const { paymentLogs } = storeToRefs(paymentStore)
const { getPaymentLogs: getPaymentLogsAction } = paymentStore

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
  isLoading: getPaymentLogsActionLoading,
  execute: executeGetPaymentLogsAction,
} = useAsyncState(getPaymentLogsAction, undefined, {
  immediate: false,
  throwError: true,
})

onMounted(() => {
  try {
    executeGetPaymentLogsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.payment-info-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .payment-list {
    @apply flex flex-col gap-4 mt-4;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}

.pager-panel {
  @apply flex flex-row justify-center mt-10 max-w-280 w-full;
}
</style>
