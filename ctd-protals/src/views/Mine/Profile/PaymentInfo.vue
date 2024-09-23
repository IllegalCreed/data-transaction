<template>
  <div class="payment-info-root-container">
    <span class="title">支付日志</span>
    <div class="payment-list">
      <payment-item v-for="item in paymentLogs" :key="item.id" :paymentLog="item"> </payment-item>
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
import type { IPaymentLog } from '@/types/payment'
import PaymentItem from './PaymentItem.vue'

const paymentLogs = ref<IPaymentLog[]>([
  {
    id: '1',
    orderNumber: 'ORD202309180001',
    amount: 500.0,
    type: 1, // 充值
    remark: '用户充值500元',
    createTime: '2023-09-18 09:00:00'
  },
  {
    id: '2',
    orderNumber: 'ORD202309180002',
    amount: -200.0,
    type: 2, // 冻结
    remark: '订单金额冻结200元',
    createTime: '2023-09-18 10:00:00'
  },
  {
    id: '3',
    orderNumber: 'ORD202309180002',
    amount: -200.0,
    type: 3, // 支付
    remark: '订单支付200元',
    createTime: '2023-09-18 11:00:00'
  },
  {
    id: '4',
    orderNumber: 'ORD202309180003',
    amount: 150.0,
    type: 4, // 退款
    remark: '订单退款150元',
    createTime: '2023-09-18 12:00:00'
  },
  {
    id: '5',
    orderNumber: 'ORD202309180004',
    amount: 300.0,
    type: 1, // 充值
    remark: '用户充值300元',
    createTime: '2023-09-18 13:00:00'
  },
  {
    id: '6',
    orderNumber: 'ORD202309180005',
    amount: -100.0,
    type: 2, // 冻结
    remark: '订单金额冻结100元',
    createTime: '2023-09-18 14:00:00'
  },
  {
    id: '7',
    orderNumber: 'ORD202309180005',
    amount: -100.0,
    type: 3, // 支付
    remark: '订单支付100元',
    createTime: '2023-09-18 15:00:00'
  },
  {
    id: '8',
    orderNumber: 'ORD202309180006',
    amount: 80.0,
    type: 4, // 退款
    remark: '订单退款80元',
    createTime: '2023-09-18 16:00:00'
  }
])

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

<style scoped lang="scss">
.payment-info-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md;

  .title {
    @apply text-xl font-bold;
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
