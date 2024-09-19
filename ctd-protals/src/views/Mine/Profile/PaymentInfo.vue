<template>
  <div class="payment-info-root-container">
    <span class="title">支付日志</span>
    <div class="payment-list">
      <div v-for="(log, index) in paymentLogs" :key="index" class="payment-item">
        <div><strong>日期：</strong>{{ log.date }}</div>
        <div class="item-content">
          <div><strong>描述：</strong>{{ log.description }}</div>
          <div><strong>金额：</strong>{{ log.amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const paymentLogs = ref([
  { date: '2024-09-18', description: '支付订单 #1234', amount: '¥200' },
  { date: '2024-09-17', description: '支付订单 #1233', amount: '¥150' },
  { date: '2024-09-16', description: '支付订单 #1232', amount: '¥300' }
])
</script>

<style scoped lang="scss">
.payment-info-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md;

  .title {
    @apply text-xl font-bold;
  }

  .payment-list {
    @apply flex flex-col gap-4 mt-4;

    .payment-item {
      @apply flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded bg-gray-50;

      .item-content {
        @apply flex flex-row justify-between gap-2;

        @media (max-width: 40rem) {
          @apply flex-col;
        }
      }
    }
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
