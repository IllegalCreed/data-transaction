<template>
  <div class="product-order-detail-root-container">
    <el-button
      size="small"
      type="primary"
      self-end
      mb-5
      @click="changeCurrentStep"
      >测试按钮，切换订单状态</el-button
    >

    <div flex flex-row items-stretch>
      <product-order-base-info :status="currentStatus" :orderId="1" flex-1 />
      <el-steps
        direction="vertical"
        :active="
          currentStep === steps.length - 1 ? currentStep + 1 : currentStep
        "
        finish-status="success"
        process-status="process"
        class="step"
      >
        <el-step v-for="item in steps" :key="item.title" :title="item.title" />
      </el-steps>
    </div>

    <el-divider />

    <product-order-contract-info
      v-if="currentStep > getStatusIndex(ProductOrderStatus.Pending)"
      :orderId="1"
    />

    <el-divider
      v-if="currentStep > getStatusIndex(ProductOrderStatus.Pending)"
    />

    <product-order-review-info
      v-if="currentStatus === ProductOrderStatus.Completed"
      :orderId="1"
    />

    <div class="btn-container">
      <el-button
        class="btn"
        v-if="currentStatus === ProductOrderStatus.Pending"
        type="primary"
        size="large"
        >签署合同</el-button
      >
      <el-button
        class="btn"
        v-if="currentStatus === ProductOrderStatus.ToCheck"
        type="primary"
        size="large"
        >确认交付</el-button
      >
      <el-button
        class="btn"
        v-if="currentStatus === ProductOrderStatus.ToReview"
        type="primary"
        size="large"
        >评价订单</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PRODUCT_ORDER_STATUS_MAP,
  ProductOrderStatus,
} from '@/types/productOrder'
import ProductOrderBaseInfo from './ProductOrderBaseInfo.vue'
import ProductOrderContractInfo from './ProductOrderContractInfo.vue'
import ProductOrderReviewInfo from './ProductOrderReviewInfo.vue'

// 枚举数组
const stepList = Object.values(ProductOrderStatus)

// 中文映射数组
const steps = stepList.map(status => ({
  title: PRODUCT_ORDER_STATUS_MAP[status],
}))

const currentStep = ref(0)
const currentStatus = computed(() => stepList[currentStep.value])
const changeCurrentStep = () => {
  currentStep.value = (currentStep.value + 1) % stepList.length
}
const getStatusIndex = (status: ProductOrderStatus): number => {
  return stepList.findIndex(s => s === status)
}
</script>

<style scoped lang="scss">
.product-order-detail-root-container {
  @apply flex flex-col p-10;

  .step {
    @apply h-auto mx-5;

    :deep(.is-process) {
      @apply text-[var(--color-primary)] border-[var(--color-primary)];
    }

    @media (max-width: 50rem) {
      @apply hidden;
    }
  }

  .btn-container {
    @apply flex flex-row justify-center items-center mt-10;

    .btn {
      @apply w-40;
    }
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .btn-container {
      .btn {
        @apply flex-1;
      }
    }
  }
}
</style>
