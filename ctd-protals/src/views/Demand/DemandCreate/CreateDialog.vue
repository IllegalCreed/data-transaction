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
          <component :is="currentPanel" @nextStep="nextStep" @prevStep="prevStep" />
        </keep-alive>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import StepGroup from '@/components/StepGroup.vue'
import BaseInfo from './Step/BaseInfo.vue'
import TradingModel from './Step/TradingModel.vue'
import DetailInfo from './Step/DetailInfo.vue'
import WaitingPublish from './Step/WaitingPublish.vue'

const modelValue = defineModel<boolean>({ required: true })

const steps = [
  { title: '基本信息' },
  { title: '交易模式' },
  { title: '详细信息' },
  { title: '审核发布' }
]

const currentStep = ref(0)

const panels = [BaseInfo, TradingModel, DetailInfo, WaitingPublish]
const includePanels = ref(['RoleSelector', 'BaseInfo', 'EmailSended', 'EmailValidate'])

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
</script>

<style lang="scss" scoped>
.wrap {
  :global(.demand-create-dialog-container) {
    @apply fixed left-20 right-20 top-20 bottom-20 m-0 w-[calc(100%-10rem)] flex flex-col;

    @media (max-width: 40rem) {
      @apply left-0 right-0 top-auto bottom-0 w-full h-80%;
    }
  }

  :global(.demand-create-dialog-container .el-dialog__body) {
    @apply h-full overflow-y-auto;
  }
}
</style>
