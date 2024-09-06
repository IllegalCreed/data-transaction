<template>
  <div class="register-control-panel">
    <span absolute top-10 left-10 text-2xl font-bold>LOGO</span>
    <step-group :steps="steps" :currentStep="currentStep" self-stretch />

    <div flex-1 w-full mt-10>
      <component :is="currentPanel" />
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

const panels = [RoleSelector, BaseInfo, EmailSended, EmailValidate]

const currentPanel = computed(() => panels[currentStep.value])
</script>

<style lang="scss" scoped>
.register-control-panel {
  @apply flex flex-col items-center flex-1 pt-30 px-20 bg-gray-100 rounded-3xl relative;

  @media (max-width: 40rem) {
    @apply px-5 rounded-none min-h-100vh;
  }
}
</style>
