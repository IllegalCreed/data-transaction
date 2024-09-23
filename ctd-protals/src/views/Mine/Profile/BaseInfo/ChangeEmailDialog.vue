<template>
  <el-dialog
    class="change-email-dialog-container"
    v-model="model"
    :lock-scroll="true"
    :close-on-click-modal="false"
    title="修改验证邮箱"
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
import ValidateIdentify from './Step/ValidateIdentify.vue'
import ChangeEmail from './Step/ChangeEmail.vue'
import ValidateEmail from './Step/ValidateEmail.vue'
import ChangeCompleted from './Step/ChangeCompleted.vue'

const model = defineModel<boolean>({ required: true })

const steps = [
  { title: '验证身份' },
  { title: '修改邮箱' },
  { title: '验证邮箱' },
  { title: '修改完成' }
]

const currentStep = ref(0)

const panels = [ValidateIdentify, ChangeEmail, ValidateEmail, ChangeCompleted]
const includePanels = ref(['ValidateIdentify', 'ChangeEmail', 'ValidateEmail', 'ChangeCompleted'])

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
  model.value = false
  ElMessage.success('创建需求申请提交成功')
}
</script>

<style lang="scss" scoped>
:global(.change-email-dialog-container) {
  @apply fixed left-20 right-20 top-20 bottom-20 my-0 mx-auto min-w-80 w-[calc(100%-10rem)] max-w-300 flex flex-col;

  @media (max-width: 40rem) {
    @apply left-0 right-0 top-auto bottom-0 w-full h-80%;
  }
}

:global(.change-email-dialog-container .el-dialog__body) {
  @apply h-full overflow-y-auto p-10;

  @media (max-width: 40rem) {
    @apply p-0 pt-5;
  }
}
</style>
