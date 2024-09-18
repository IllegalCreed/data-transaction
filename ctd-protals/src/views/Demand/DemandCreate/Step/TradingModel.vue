<template>
  <div flex flex-col>
    <span text-2xl font-bold mb-10>请选择您的交易模式</span>

    <trading-item
      icon="i-fluent:gavel-32-regular"
      title="招标模式"
      description="如果您是个人用户，可以在平台上浏览、发布个人数据需求，享受数据交易和服务"
      tag="适合个人数据消费者和数据分析师"
      :isSelected="demandStore.tradingModel === 'tendering'"
      @click="selectModel('tendering')"
      mb-4
    ></trading-item>

    <trading-item
      mb-8
      icon="i-ic:outline-handshake"
      :disabled="true"
      title="竞标模式（开发中，暂不可选）"
      description="企业用户可以利用平台进行数据服务交易，管理企业数据资产，发布企业级数据需求"
      tag="适合数据供应商、服务商和需求承接方"
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
