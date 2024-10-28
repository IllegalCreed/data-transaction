<template>
  <div class="send-email-root-container">
    <span class="title">忘记密码？</span>
    <p class="desc">别担心，跟随我们的引导重置密码</p>

    <el-form
      @submit.prevent
      class="form"
      :model="baseInfo"
      :rules="rules"
      ref="baseForm"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input
          data-testid="email-input"
          v-model="baseInfo.email"
          placeholder="您注册时填写的邮箱地址"
        />
      </el-form-item>
    </el-form>

    <el-button
      data-testid="next-button"
      class="btn"
      type="primary"
      :loading="forgotSendEmailActionLoading"
      @click="handleNextStep"
      >下一步</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAccountStore } from '@/stores/modules/account'

const accountStore = useAccountStore()
const {
  setForgotEmail: setForgotEmailAction,
  forgotSendEmail: forgotSendEmailAction,
} = accountStore

const {
  isLoading: forgotSendEmailActionLoading,
  execute: executeForgotSendEmailAction,
} = useAsyncState(forgotSendEmailAction, undefined, {
  immediate: false,
  throwError: true,
})

const baseInfo = ref({
  email: '',
})

const baseForm = useTemplateRef<FormInstance>('baseForm')
const rules = reactive<FormRules<{ email: string }>>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] },
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

const emit = defineEmits(['nextStep'])
const handleNextStep = async () => {
  if (validateOnSubmit) {
    if (await handleSubmit()) {
      try {
        setForgotEmailAction(baseInfo.value.email)
        await executeForgotSendEmailAction(0, baseInfo.value.email)
        emit('nextStep')
      } catch {
        ElMessage.error('发送失败，请稍后再试')
      }
    } else {
      ElMessage.error('请检查填写的信息是否正确')
    }
  } else {
    emit('nextStep')
  }
}
</script>

<style scoped lang="scss">
.send-email-root-container {
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

  .btn {
    @apply mt-5 w-80;
  }

  @media (max-width: 30rem) {
    .form {
      @apply w-70;
    }

    .btn {
      @apply w-70;
    }
  }
}
</style>
