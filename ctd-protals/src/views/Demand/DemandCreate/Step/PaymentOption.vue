<template>
  <div class="payment-option-root-container">
    <span text-2xl font-bold mb-5>请选择您的付款方式</span>

    <div class="payment-methods">
      <div
        class="payment-method"
        :class="{ selected: paymentOption.selectedMethod === 'project' }"
        @click="selectMethod('project')"
      >
        <i-ph:package class="icon"></i-ph:package>
        <span class="title">按项目付款</span>
      </div>
      <div
        class="payment-method disabled"
        :class="{ selected: paymentOption.selectedMethod === 'time' }"
        @click="selectMethod('time')"
      >
        <i-ion:time-outline class="icon"></i-ion:time-outline>
        <span class="title">按时间付款（暂不可选）</span>
      </div>
    </div>

    <!-- 项目预算输入 -->
    <div v-if="paymentOption.selectedMethod === 'project'" class="budget-options">
      <span text-xl font-bold mb-4>请输入项目预算</span>
      <!-- 预算类型选择 -->
      <el-radio-group v-model="paymentOption.budgetType">
        <el-radio label="fixed">明确价格</el-radio>
        <el-radio label="range">价格区间</el-radio>
        <el-radio label="negotiable">面议</el-radio>
      </el-radio-group>

      <!-- 明确价格输入 -->
      <div v-if="paymentOption.budgetType === 'fixed'" class="input-group">
        <el-input-number
          :controls="false"
          v-model="paymentOption.fixedPrice"
          :min="0"
          placeholder="请输入价格"
        ></el-input-number>
        <span class="unit">元</span>
      </div>

      <!-- 价格区间输入 -->
      <div v-if="paymentOption.budgetType === 'range'" class="input-group">
        <el-input-number
          :controls="false"
          v-model="paymentOption.minPrice"
          :min="0"
          placeholder="最低价"
        ></el-input-number>
        <span class="unit">元 至 </span>
        <el-input-number
          :controls="false"
          v-model="paymentOption.maxPrice"
          :min="paymentOption.minPrice || 0"
          placeholder="最高价"
        ></el-input-number>
        <span class="unit">元</span>
      </div>
    </div>

    <div class="step-btn-container">
      <el-button class="step-btn" type="primary" @click="handlePrevStep">上一步</el-button>
      <el-button class="step-btn" type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { paymentOption } = demandStore

// 选择付款方式
const selectMethod = (method: string) => {
  if (method === 'time') {
    // 按时间付款暂不可选，直接返回
    return
  }
  paymentOption.selectedMethod = method
}

const emit = defineEmits(['nextStep', 'prevStep'])
const handleNextStep = () => {
  emit('nextStep')
}

const handlePrevStep = () => {
  emit('prevStep')
}
</script>

<style lang="scss" scoped>
.payment-option-root-container {
  @apply flex flex-col;

  .payment-methods {
    @apply flex flex-row gap-5 mb-10;

    .payment-method {
      @apply flex-1 flex flex-col items-center justify-center gap-2 border border-solid border-gray-500 rounded cursor-pointer p-4;

      &.selected {
        @apply border-red-500 bg-red-100;
      }

      &.disabled {
        @apply border-gray-200 text-gray-200 cursor-not-allowed;
      }

      .icon {
        @apply w-8 h-8;
      }

      .title {
        @apply text-base;
      }
    }
  }

  .budget-options {
    @apply flex flex-col;

    .input-group {
      @apply mt-4;

      .unit {
        @apply text-sm mx-2;
      }
    }
  }
}

.step-btn-container {
  @apply flex flex-row items-center self-center mt-10;

  .step-btn {
    @apply w-30 mb-10;
  }
}
</style>
