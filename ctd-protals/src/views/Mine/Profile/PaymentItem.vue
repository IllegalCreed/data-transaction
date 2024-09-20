<template>
  <div class="payment-item-root-container">
    <el-tag self-start :type="typeMap[paymentLog.type]?.tagType">{{
      typeMap[paymentLog.type]?.label
    }}</el-tag>

    <div class="item-content">
      <strong>#{{ paymentLog.orderNumber }}</strong>
      <strong text-red-500 text-lg>￥{{ paymentLog.amount }}</strong>
    </div>

    <div class="item-content" mt-2>
      <span text-gray-500 text-sm
        ><strong text-gray-800>描述：</strong>{{ paymentLog.remark }}</span
      >
      <span text-sm text-gray-400>{{ paymentLog.createTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPaymentLog } from '@/types/payment'

defineProps<{
  paymentLog: IPaymentLog
}>()

// 定义类型映射
const typeMap: Record<
  number,
  { label: string; tagType: 'primary' | 'success' | 'info' | 'warning' | 'danger' }
> = {
  1: { label: '充值', tagType: 'success' },
  2: { label: '冻结', tagType: 'warning' },
  3: { label: '支付', tagType: 'info' },
  4: { label: '退款', tagType: 'danger' }
}
</script>

<style lang="scss" scoped>
.payment-item-root-container {
  @apply flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded bg-gray-50;

  .item-content {
    @apply flex flex-row items-center justify-between gap-2;

    @media (max-width: 40rem) {
      @apply flex-col items-start;
    }
  }
}
</style>
