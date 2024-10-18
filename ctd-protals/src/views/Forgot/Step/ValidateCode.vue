<template>
  <div class="validate-code-root-container">
    <span class="title">验证邮箱</span>
    <p class="desc">
      我们向您的邮箱<strong mx-2>{{ email }}</strong
      >发送了一封邮件
    </p>

    <verification-code-input mt-4 v-model="code"></verification-code-input>

    <div class="step-btn-container">
      <el-button class="step-btn" type="primary" @click="handlePrevStep">上一步</el-button>
      <el-button class="step-btn" type="primary" @click="handleNextStep">下一步</el-button>
    </div>

    <span text-xs my-5
      >没有收到邮件？点击<span @click="reSendEmail" class="resend-email">重新发送邮件</span></span
    >
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import VerificationCodeInput from '@/components/VerificationCodeInput.vue'

const code = ref('')
const email = ref('someone@email.com')

const emit = defineEmits(['nextStep', 'prevStep'])
const handleNextStep = async () => {
  emit('nextStep')
}
const handlePrevStep = () => {
  emit('prevStep')
}

const reSendEmail = () => {
  ElMessage.success('重新发送成功')
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
