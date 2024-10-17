<template>
  <div class="reset-root-container">
    <span class="title">设置新密码</span>
    <p class="desc">我们将会更新您的密码</p>

    <el-form
      class="form"
      :model="baseInfo"
      :rules="rules"
      ref="baseForm"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="baseInfo.password"
          type="password"
          placeholder="至少8位大小写字母数字及特殊符号"
        />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="baseInfo.confirmPassword" type="password" placeholder="请再次输入密码" />
      </el-form-item>
    </el-form>

    <el-button class="btn" type="primary" @click="handleNextStep">下一步</el-button>
  </div>
</template>

<script setup lang="ts">
import type { IPassword } from '@/types/forgot'
import type { InternalRuleItem } from 'async-validator'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const baseForm = useTemplateRef<FormInstance>('baseForm')
const baseInfo = ref({
  password: '',
  confirmPassword: ''
})

const validateNewPwd = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  const regex =
    /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,20}$/
  if (!regex.test(baseInfo.value.password)) {
    callback(new Error('密码必须大于8位，且至少包含大小写字母数字及特殊字符'))
  } else {
    callback()
  }
}

const validateRepeatPwd = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (baseInfo.value.password !== baseInfo.value.confirmPassword) {
    callback(new Error('请保证两次输入的密码一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<IPassword>>({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: validateNewPwd,
      trigger: ['blur']
    }
  ],
  confirmPassword: [
    { required: true, message: '请再次确认密码', trigger: 'blur' },
    {
      validator: validateRepeatPwd,
      trigger: ['blur']
    }
  ]
})

const validateOnSubmit = false
const handleSubmit = async (): Promise<boolean> => {
  if (!baseForm.value) return Promise.resolve(false)

  const baseFormValid = await new Promise<boolean>((resolve) => {
    baseForm.value?.validate((valid) => {
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
      emit('nextStep')
    } else {
      ElMessage.error('请检查填写的信息是否正确')
    }
  } else {
    emit('nextStep')
  }
}
</script>

<style scoped lang="scss">
.reset-root-container {
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
