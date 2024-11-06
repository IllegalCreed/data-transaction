<template>
  <div class="payment-item-root-container">
    <div
      class="icon"
      :style="{
        color: paymentTypeColor,
        borderColor: paymentTypeColor,
        backgroundColor: paymentTypeBgColor,
      }"
    >
      {{ paymentTypeText }}
    </div>

    <div class="main-container">
      <div class="left-container">
        <span class="order-num">#{{ paymentLog.orderNumber }}</span>
        <span class="desc left-desc">{{ paymentLog.remark }}</span>
        <span class="time">{{ paymentLog.createTime }}</span>
      </div>

      <div class="right-container">
        <strong class="price">￥{{ paymentLog.amount }}</strong>
        <span class="desc right-desc">{{ paymentLog.remark }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PAYMENT_TYPE_COLOR_MAP,
  PAYMENT_TYPE_MAP,
  type IPaymentLog,
} from '@/types/payment'

const { paymentLog } = defineProps<{
  paymentLog: IPaymentLog
}>()

const paymentTypeText = computed(() => PAYMENT_TYPE_MAP[paymentLog.type])
const paymentTypeColor = computed(() => PAYMENT_TYPE_COLOR_MAP[paymentLog.type])

const paymentTypeBgColor = computed(() => {
  return `${paymentTypeColor.value}22`
})
</script>

<style lang="scss" scoped>
.payment-item-root-container {
  @apply flex flex-row items-center gap-4 p-4 border border-solid border-[var(--color-border)];

  .icon {
    @apply text-sm flex-shrink-0 rounded-full w-12 h-12 flex items-center justify-center border border-solid border-[var(--color-border)];
  }

  .main-container {
    @apply flex-1 flex flex-row items-center justify-between gap-2;

    .left-container {
      @apply flex flex-col items-start justify-between gap-4;

      .order-num {
        @apply break-all;

        @media (max-width: 40rem) {
          @apply text-sm;
        }
      }

      .time {
        @apply text-xs text-[var(--color-text-lighter)];
      }

      .left-desc {
        @apply hidden;

        @media (max-width: 40rem) {
          @apply block;
        }
      }

      @media (max-width: 40rem) {
        @apply items-start justify-start gap-2;
      }
    }

    .right-container {
      @apply flex flex-col items-end justify-between gap-4;

      .price {
        @apply text-lg text-[--color-price] font-bold;
      }

      .right-desc {
        @apply block;

        @media (max-width: 40rem) {
          @apply hidden;
        }
      }
    }

    .desc {
      @apply text-sm text-[var(--color-text-light)];

      @media (max-width: 40rem) {
        @apply text-xs;
      }
    }
  }

  @media (max-width: 40rem) {
    @apply items-start border-none p-0 pb-4 gap-2 border-b border-b-solid border-b-[var(--color-border)];

    .icon {
      @apply w-10 h-10 text-xs;
    }
  }
}
</style>
