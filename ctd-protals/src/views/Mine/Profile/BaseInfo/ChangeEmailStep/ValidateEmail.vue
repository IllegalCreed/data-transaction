<template>
  <div flex flex-col items-center>
    <span text-3xl font-bold mt-10>验证邮箱</span>
    <p text-sm text-gray-400>
      我们向您的新邮箱<strong mx-2>{{ newEmail }}</strong
      >发送了一封邮件
    </p>

    <verification-code-input mt-4 v-model="code"></verification-code-input>

    <div class="step-btn-container">
      <el-button
        class="step-btn"
        type="primary"
        :loading="changeEmailActionLoading"
        @click="handleNextStep"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import VerificationCodeInput from '@/components/VerificationCodeInput.vue'

import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { newEmail } = storeToRefs(accountStore)
const { changeEmail: changeEmailAction } = accountStore

const code = ref('')

const {
  isLoading: changeEmailActionLoading,
  execute: executeChangeEmailAction,
} = useAsyncState(() => changeEmailAction(code.value), undefined, {
  immediate: false,
  throwError: true,
})

const emit = defineEmits(['nextStep', 'prevStep'])
const handleNextStep = async () => {
  try {
    await executeChangeEmailAction()
    emit('nextStep')
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error('修改失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.step-btn-container {
  @apply flex flex-row items-center mt-10;
  .step-btn {
    @apply w-30;
  }
}

.resend-email {
  @apply text-[var(--color-primary)] cursor-pointer select-none;
}
</style>
