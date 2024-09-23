<template>
  <div class="product-order-detail-root-container">
    <el-button size="small" type="primary" self-end mb-5 @click="changeCurrentStep"
      >测试按钮，切换订单状态</el-button
    >

    <step-group class="step" :steps="steps" :currentStep="currentStep" self-stretch />

    <product-order-base-info
      :status="currentStep as OrderStatus"
      :order-id="1"
    ></product-order-base-info>
  </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from '@/types/product'
import ProductOrderBaseInfo from './ProductOrderBaseInfo.vue'

const steps = [
  { title: '待审核' },
  { title: '合同协商' },
  { title: '待交付' },
  { title: '待验查' },
  { title: '待评价' },
  { title: '已评价' }
]

const currentStep = ref(0)

const changeCurrentStep = () => {
  currentStep.value = (currentStep.value + 1) % steps.length
}
</script>

<style scoped lang="scss">
.product-order-detail-root-container {
  @apply flex flex-col p-10;

  .step {
    @apply mb-10;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .step {
      @apply hidden;
    }
  }
}
</style>
