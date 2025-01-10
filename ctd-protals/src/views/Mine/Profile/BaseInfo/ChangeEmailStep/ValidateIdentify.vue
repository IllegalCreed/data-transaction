<template>
  <div flex flex-col items-center>
    <span text-3xl font-bold mt-10>验证身份</span>
    <p text-sm text-gray-400>请输入登录密码及救援代码</p>

    <el-form
      @submit.prevent
      class="form"
      :model="baseInfo"
      :rules="rules"
      ref="baseForm"
      label-width="auto"
      label-position="top"
      mt-10
      w-60
    >
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="baseInfo.password"
          type="password"
          placeholder="请输入密码"
          data-testid="password-input"
        />
      </el-form-item>
      <el-form-item label="救援代码" prop="recoveryCode">
        <el-input
          v-model="baseInfo.recoveryCode"
          placeholder="请输入救援代码"
          data-testid="recovery-code-input"
        />
      </el-form-item>
    </el-form>

    <div class="step-btn-container">
      <el-button
        data-testid="next-button"
        class="step-btn"
        type="primary"
        :loading="verifyRecoveryCodeActionLoading"
        @click="handleNextStep"
        >下一步</el-button
      >
    </div>

    <span text-xs my-4
      >如果未能提供 救援代码，请<span class="resend-email"
        >联系管理员</span
      ></span
    >
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { verifyRecoveryCode: verifyRecoveryCodeAction } = accountStore

const baseForm = useTemplateRef<FormInstance>('baseForm')
const baseInfo = ref({
  password: '',
  recoveryCode: '',
})

const rules = reactive<FormRules<{ password: string; recoveryCode: string }>>({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  recoveryCode: [
    { required: true, message: '请输入救援代码', trigger: 'blur' },
  ],
})

const validateOnSubmit = true
const handleSubmit = async (): Promise<boolean> => {
  if (!baseForm.value) return Promise.resolve(false)

  const baseFormValid = await new Promise<boolean>(resolve => {
    baseForm.value?.validate(valid => {
      resolve(valid)
    })
  })

  if (!baseFormValid) return Promise.resolve(false)

  return Promise.resolve(true)
}

const {
  isLoading: verifyRecoveryCodeActionLoading,
  execute: executeVerifyRecoveryCodeAction,
} = useAsyncState(
  () =>
    verifyRecoveryCodeAction(
      baseInfo.value.password,
      baseInfo.value.recoveryCode,
    ),
  undefined,
  {
    immediate: false,
    throwError: true,
  },
)

const emit = defineEmits(['nextStep'])
const handleNextStep = async () => {
  if (validateOnSubmit) {
    if (await handleSubmit()) {
      try {
        await executeVerifyRecoveryCodeAction()
        emit('nextStep')
      } catch (error: unknown) {
        if (error instanceof Error) {
          ElMessage.error('验证失败')
        }
      }
    } else {
      ElMessage.error('请检查填写的信息是否正确')
    }
  } else {
    emit('nextStep')
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
