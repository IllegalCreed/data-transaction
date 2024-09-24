<template>
  <div class="demand-order-detail-root-container">
    <el-button size="small" type="primary" self-end mb-5 @click="changeCurrentStep"
      >测试按钮，切换订单状态</el-button
    >

    <step-group class="step" :steps="steps" :currentStep="currentStep" self-stretch />

    <demand-order-base-info :status="currentStep" :orderId="1" />

    <demand-order-company-selector v-if="currentStep === 1" :orderId="1" mt-10 />

    <demand-order-company-info v-if="currentStep > 1" :orderId="1" mt-10 />

    <demand-order-contract-info v-if="currentStep > 2" :orderId="1" mt-10 />

    <demand-order-review-info v-if="currentStep === 6" :orderId="1" mt-10 />

    <div class="btn-container">
      <el-button class="btn" v-if="currentStep === 2" type="primary">签署合同</el-button>
      <el-button class="btn" v-if="currentStep === 4" type="primary">确认交付</el-button>
      <el-button class="btn" v-if="currentStep === 5" type="primary">评价订单</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemandOrderBaseInfo from './DemandOrderBaseInfo.vue'
import DemandOrderCompanySelector from './DemandOrderCompanySelector/DemandOrderCompanySelector.vue'
import DemandOrderCompanyInfo from './DemandOrderCompanyInfo.vue'
import DemandOrderContractInfo from './DemandOrderContractInfo.vue'
import DemandOrderReviewInfo from './DemandOrderReviewInfo.vue'

const steps = [
  { title: '待审核' },
  { title: '投标中' },
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
.demand-order-detail-root-container {
  @apply flex flex-col p-10;

  .step {
    @apply mb-10;
  }

  .btn-container {
    @apply flex flex-row justify-center items-center mt-10;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .step {
      @apply hidden;
    }

    .btn-container {
      .btn {
        @apply flex-1;
      }
    }
  }
}
</style>
