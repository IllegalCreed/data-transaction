<template>
  <el-dialog
    class="change-password-dialog-container"
    v-model="model"
    :lock-scroll="true"
    :close-on-click-modal="false"
    title="修改密码"
  >
    <div flex flex-col justify-start min-h-full>
      <step-group :steps="steps" :currentStep="currentStep" self-stretch />

      <div flex-1 w-full mt-10>
        <keep-alive :include="includePanels">
          <component
            :is="currentPanel"
            @nextStep="nextStep"
            @prevStep="prevStep"
            @complete="changePasswordComplete"
          />
        </keep-alive>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import StepGroup from '@/components/StepGroup.vue'
import ValidatePassword from './ChangePasswordStep/ValidatePassword.vue'
import ValidateEmail from './ChangePasswordStep/ValidateEmail.vue'
import ChangePassword from './ChangePasswordStep/ChangePassword.vue'
import ChangeCompleted from './ChangePasswordStep/ChangeCompleted.vue'

const model = defineModel<boolean>({ required: true })

const steps = [
  { title: '验证密码' },
  { title: '验证邮箱' },
  { title: '设置密码' },
  { title: '修改完成' },
]

const currentStep = ref(0)

const panels = [
  ValidateEmail,
  ValidatePassword,
  ChangePassword,
  ChangeCompleted,
]
const includePanels = ref([
  'ValidatePassword',
  'ChangePassword',
  'ValidateEmail',
  'ChangeCompleted',
])

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

const changePasswordComplete = () => {
  model.value = false
}
</script>

<style lang="scss" scoped>
:global(.change-password-dialog-container) {
  @apply fixed left-20 right-20 top-20 bottom-20 my-0 mx-auto min-w-80 w-[calc(100%-10rem)] max-w-300 flex flex-col;

  @media (max-width: 40rem) {
    @apply left-0 right-0 top-auto bottom-0 w-full h-80%;
  }
}

:global(.change-password-dialog-container .el-dialog__body) {
  @apply h-full overflow-y-auto p-10;

  @media (max-width: 40rem) {
    @apply p-0 pt-5;
  }
}
</style>
