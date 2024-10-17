<template>
  <div
    class="forgot-control-panel-root-container"
    :style="{ backgroundImage: `url('${bg}')` }"
  >
    <img :src="icon" class="logo" h-10 w-10 object-contain />
    <span class="back" @click="goLogin">返回登录</span>
    <div class="forgot-control-panel">
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
  </div>
</template>

<script setup lang="ts">
import StepGroup from '@/components/StepGroup.vue'
import SendEmail from './Step/SendEmail.vue'
import ValidateCode from './Step/ValidateCode.vue'
import ResetPassword from './Step/ResetPassword.vue'
import ResetComplete from './Step/ResetComplete.vue'

const icon = new URL('@/assets/icon/logo.png', import.meta.url).href
const bg = ref(
  new URL('@/assets/background/registerBackground.png', import.meta.url).href,
)

const steps = [
  { title: '发送邮件' },
  { title: '邮件验证' },
  { title: '设置密码' },
  { title: '修改完成' },
]

const currentStep = ref(0)

const panels = [SendEmail, ValidateCode, ResetPassword, ResetComplete]
const includePanels = ref([
  'SendEmail',
  'ValidateCode',
  'ResetPassword',
  'ResetComplete',
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
.forgot-control-panel-root-container {
  @apply relative flex-1 flex flex-col items-stretch justify-start p-20 pt-40 bg-center bg-cover;

  .logo {
    @apply absolute top-10 left-10 text-2xl font-bold z-10;
  }

  .back {
    @apply absolute top-11 right-10 text-base text-[var(--color-primary)] hover:opacity-60 cursor-pointer select-none;
  }

  .forgot-control-panel {
    @apply flex flex-col;
  }

  @media (max-width: 40rem) {
    @apply px-5 pt-20;

    .logo {
      @apply top-5 left-5;
    }

    .back {
      @apply top-6 right-5;
    }

    .forgot-control-panel {
      @apply min-h-100vh;
    }
  }
}
</style>
