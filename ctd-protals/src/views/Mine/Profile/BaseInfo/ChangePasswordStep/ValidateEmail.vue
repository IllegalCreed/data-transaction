<template>
  <div flex flex-col items-center>
    <span text-3xl font-bold mt-10>验证邮箱</span>
    <p text-sm text-gray-400>
      我们向您的新邮箱<strong mx-2 data-testid="send-email-address">{{
        userinfo?.email
      }}</strong
      >发送了一封邮件
    </p>

    <verification-code-input mt-4 v-model="code"></verification-code-input>

    <div class="step-btn-container">
      <el-button
        data-testid="next-button"
        class="step-btn"
        :loading="verifyCodeActionLoading"
        type="primary"
        @click="handleNextStep"
        >下一步</el-button
      >
    </div>

    <span text-xs my-4>
      没有收到邮件？点击
      <span
        @click="reSendEmail"
        class="resend-email"
        data-testid="resend-email-button"
      >
        重新发送邮件
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import VerificationCodeInput from '@/components/VerificationCodeInput.vue'
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { sendEmail: sendEmailAction, verifyCode: verifyCodeAction } =
  accountStore
const { userinfo } = storeToRefs(accountStore)

const code = ref('')

const { isLoading: verifyCodeActionLoading, execute: executeVerifyCodeAction } =
  useAsyncState(() => verifyCodeAction(code.value), undefined, {
    immediate: false,
    throwError: true,
  })

const emit = defineEmits(['nextStep'])
const handleNextStep = async () => {
  if (!code.value || code.value.length !== 6) {
    ElMessage.error('请输入完整的验证码')
    return
  }

  try {
    await executeVerifyCodeAction()
    emit('nextStep')
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error('验证失败')
    }
  }
}

const reSendEmail = async () => {
  await sendEmail()
  ElMessage.success('重新发送成功')
}

onMounted(async () => {
  sendEmail()
})

const sendEmail = async () => {
  try {
    await sendEmailAction()
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error('发送邮件失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.step-btn-container {
  @apply flex flex-row items-center mt-10;
  .step-btn {
    @apply w-60;
  }
}

.resend-email {
  @apply text-[var(--color-primary)] cursor-pointer select-none;
}
</style>
