<template>
  <div class="forgot-control-panel">
    <span absolute top-10 left-10 text-2xl font-bold>LOGO</span>
    <span
      absolute
      top-11
      right-10
      text-sm
      text-gray-500
      hover:opacity-60
      cursor-pointer
      select-none
      @click="goLogin"
      >返回登录</span
    >
    <step-group :steps="steps" :currentStep="currentStep" self-stretch />

    <div flex-1 w-full mt-10>
      <keep-alive :include="includePanels">
        <component
          :is="currentPanel"
          @nextStep="nextStep"
          @prevStep="prevStep"
          @setStep="setStep"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepGroup from '@/components/StepGroup.vue'
import SendEmail from './Step/SendEmail.vue'
import ValidateCode from './Step/ValidateCode.vue'
import ResetPassword from './Step/ResetPassword.vue'
import ResetComplete from './Step/ResetComplete.vue'

const steps = [
  { title: '发送邮件' },
  { title: '邮件验证' },
  { title: '设置密码' },
  { title: '修改完成' }
]

const currentStep = ref(0)

const panels = [SendEmail, ValidateCode, ResetPassword, ResetComplete]
const includePanels = ref(['SendEmail', 'ValidateCode', 'ResetPassword', 'ResetComplete'])

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

const setStep = (value: number) => {
  if (value >= 0 && value < steps.length) {
    currentStep.value = value
  }
}

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.forgot-control-panel {
  @apply flex flex-col items-center flex-1 pt-30 px-20 bg-gray-100 rounded-3xl relative;

  @media (max-width: 40rem) {
    @apply px-5 rounded-none min-h-100vh;
  }
}
</style>
