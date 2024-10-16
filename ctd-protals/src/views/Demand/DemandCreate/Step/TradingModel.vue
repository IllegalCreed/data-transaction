<template>
  <div flex flex-col>
    <span text-2xl font-bold mb-10>请选择您的交易模式</span>

    <trading-item
      icon="i-fluent:gavel-32-regular"
      title="招标模式"
      description="发布您的项目需求，邀请供应商投标或接受供应商主动投标，择优选择最佳合作伙伴"
      tag="适合有明确需求的企业和个人"
      :isSelected="demandStore.tradingModel === 'tendering'"
      @click="selectModel('tendering')"
      mb-4
    ></trading-item>

    <trading-item
      mb-8
      icon="i-ic:outline-handshake"
      :disabled="true"
      title="竞标模式（开发中，暂不可选）"
      description="发布您的项目意向，供应商提交作品竞标，您从中挑选满意的作品并支付费用"
      tag="适合需求不明确，寻求创意方案的用户"
      :isSelected="demandStore.tradingModel === 'bidding'"
    ></trading-item>

    <div class="step-btn-container">
      <el-button class="step-btn" type="primary" @click="handlePrevStep">上一步</el-button>
      <el-button class="step-btn" type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TradingItem from './TradingItem.vue'

import { ElMessage } from 'element-plus'
import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()

const selectModel = (model: string) => {
  demandStore.setTradingModel(model)
}

const emit = defineEmits(['nextStep', 'prevStep'])
const handleNextStep = () => {
  if (demandStore.tradingModel) {
    emit('nextStep')
  } else {
    ElMessage.error('请选择一个交易模式')
  }
}

const handlePrevStep = () => {
  emit('prevStep')
}
</script>

<style lang="scss" scoped>
.step-btn-container {
  @apply flex flex-row items-center mt-5;

  .step-btn {
    @apply w-30 mb-10;
  }

  @media (max-width: 100rem) {
    @apply self-center;
  }

  @media (max-width: 40rem) {
    @apply mt-0;
  }
}
</style>
