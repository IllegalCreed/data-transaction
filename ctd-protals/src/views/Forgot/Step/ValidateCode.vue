<template>
  <div class="validate-code-root-container">
    <span class="title">验证邮箱</span>
    <p class="desc">我们向您的邮箱{{ email }}发送了一封验证邮件</p>

    <verification-code-input
      data-testid="verification-code-input"
      mt-4
      v-model="code"
    ></verification-code-input>

    <div class="step-btn-container">
      <el-button
        data-testid="prev-button"
        class="step-btn"
        type="primary"
        @click="handlePrevStep"
        >上一步</el-button
      >
      <el-button
        data-testid="next-button"
        class="step-btn"
        :loading="forgotVerifyCodeActionLoading"
        type="primary"
        @click="handleNextStep"
        >下一步</el-button
      >
    </div>

    <span text-xs my-5
      >没有收到邮件？点击<span
        :loading="forgotSendEmailActionLoading"
        @click="reSendEmail"
        class="resend-email"
        data-testid="resend-email-button"
        >重新发送邮件</span
      ></span
    >
  </div>
</template>

<script setup lang="ts">
import VerificationCodeInput from '@/components/VerificationCodeInput.vue'
import { useAccountStore } from '@/stores/modules/account'

const accountStore = useAccountStore()
const { forgotEmail: email } = storeToRefs(accountStore)
const {
  forgotVerifyCode: forgotVerifyCodeAction,
  setForgotToken: setForgotTokenAction,
  forgotSendEmail: forgotSendEmailAction,
} = accountStore

const code = ref('')

const {
  state: token,
  isLoading: forgotVerifyCodeActionLoading,
  execute: executeForgotVerifyCodeAction,
} = useAsyncState(forgotVerifyCodeAction, '', {
  immediate: false,
  throwError: true,
})

const emit = defineEmits(['nextStep', 'prevStep'])
const handleNextStep = async () => {
  if (!email.value) {
    ElMessage.error('未找到邮箱')
    return
  }
  if (!code.value || code.value.length !== 6) {
    ElMessage.error('请输入完整的验证码')
    return
  }
  try {
    await executeForgotVerifyCodeAction(0, email.value, code.value)
    ElMessage.success('验证成功')
    setForgotTokenAction(token.value)
    emit('nextStep')
  } catch {
    ElMessage.error('验证失败')
  }
}
const handlePrevStep = () => {
  emit('prevStep')
}

const {
  isLoading: forgotSendEmailActionLoading,
  execute: executeForgotSendEmailAction,
} = useAsyncState(forgotSendEmailAction, undefined, {
  immediate: false,
  throwError: true,
})

const reSendEmail = async () => {
  if (!email.value) {
    ElMessage.error('未找到邮箱')
    return
  }
  try {
    await executeForgotSendEmailAction(0, email.value)
    ElMessage.success('邮件发送成功')
  } catch {
    ElMessage.error('邮件发送失败')
  }
}
</script>

<style scoped lang="scss">
.validate-code-root-container {
  @apply flex flex-col items-center;

  .title {
    @apply text-2xl font-bold;
  }

  .desc {
    @apply text-sm text-[var(--color-text-lighter)] mb-20;
  }

  .form {
    @apply w-80;
  }

  @media (max-width: 30rem) {
    .form {
      @apply w-70;
    }
  }
}

.resend-email {
  @apply text-[var(--color-primary)] cursor-pointer select-none;
}

.step-btn-container {
  @apply flex flex-row items-center mt-10 gap-5;
  .step-btn {
    @apply w-30;
  }
}
</style>
