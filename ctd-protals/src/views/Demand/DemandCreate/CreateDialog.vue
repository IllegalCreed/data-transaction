<template>
  <el-dialog
    class="demand-create-dialog-container"
    v-model="modelValue"
    :lock-scroll="true"
    title="创建需求"
  >
    <div flex flex-col justify-start min-h-full>
      <step-group :steps="steps" :currentStep="currentStep" self-stretch />

      <div flex-1 w-full mt-10>
        <keep-alive :include="includePanels">
          <component
            :is="currentPanel"
            @nextStep="nextStep"
            @prevStep="prevStep"
            @complete="submitDemand"
          />
        </keep-alive>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

import StepGroup from '@/components/StepGroup.vue'
import BaseInfo from './Step/BaseInfo.vue'
import TradingModel from './Step/TradingModel.vue'
import PaymentOption from './Step/PaymentOption.vue'
import MoreInfo from './Step/MoreInfo.vue'

const modelValue = defineModel<boolean>({ required: true })

const steps = [
  { title: '基本信息' },
  { title: '交易模式' },
  { title: '付款方式' },
  { title: '其他信息' }
]

const currentStep = ref(0)

const panels = [BaseInfo, TradingModel, PaymentOption, MoreInfo]
const includePanels = ref(['BaseInfo', 'TradingModel', 'PaymentOption', 'MoreInfo'])

const currentPanel = computed(() => panels[currentStep.value])

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitDemand = () => {
  modelValue.value = false
  ElMessage.success('创建需求申请提交成功')
}
</script>

<style lang="scss" scoped>
:deep(.demand-create-dialog-container) {
  @apply fixed left-20 right-20 top-20 bottom-20 my-0 mx-auto min-w-80 w-[calc(100%-10rem)] max-w-300 flex flex-col;

  @media (max-width: 40rem) {
    @apply left-0 right-0 top-auto bottom-0 w-full h-80%;
  }
}

:deep(.demand-create-dialog-container .el-dialog__body) {
  @apply h-full overflow-y-auto p-10;

  @media (max-width: 40rem) {
    @apply p-0 pt-5;
  }
}
</style>
