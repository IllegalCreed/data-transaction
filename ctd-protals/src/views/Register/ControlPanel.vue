<template>
  <div class="register-control-panel-root-container">
    <span class="logo">LOGO</span>
    <span class="back" @click="goLogin">返回登录</span>
    <div class="register-control-panel">
      <step-group :steps="steps" :currentStep="currentStep" self-stretch />

      <div flex-1 w-full mt-10>
        <keep-alive :include="includePanels">
          <component :is="currentPanel" @nextStep="nextStep" @prevStep="prevStep" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepGroup from '@/components/StepGroup.vue'
import RoleSelector from './Step/RoleSelector.vue'
import BaseInfo from './Step/BaseInfo.vue'
import EmailSended from './Step/EmailSended.vue'
import EmailValidate from './Step/EmailValidate.vue'

const steps = [
  { title: '选择身份' },
  { title: '基本信息' },
  { title: '发送邮件' },
  { title: '注册完成' }
]

const currentStep = ref(0)

const route = useRoute()
const token = route.query.token
if (token) {
  console.log('激活 token 存在:', token)
  provide('token', token)
  currentStep.value = 3
}

const panels = [RoleSelector, BaseInfo, EmailSended, EmailValidate]
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

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.register-control-panel-root-container {
  @apply relative flex-1 flex flex-col items-stretch justify-start p-20 pt-40 backdrop-blur-xl;

  .logo {
    @apply absolute top-10 left-10 text-2xl font-bold z-10;
  }

  .back {
    @apply absolute top-11 right-10 text-base text-[var(--color-primary)] hover:opacity-60 cursor-pointer select-none;
  }

  .register-control-panel {
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

    .register-control-panel {
      @apply min-h-100vh;
    }
  }
}
</style>
