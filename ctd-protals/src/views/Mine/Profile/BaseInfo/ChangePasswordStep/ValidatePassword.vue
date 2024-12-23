<template>
  <div flex flex-col items-center>
    <span text-3xl font-bold mt-10>验证身份</span>
    <p text-sm text-gray-400>请输入登录密码</p>

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
      <el-form-item label="密码" prop="email">
        <el-input
          v-model="baseInfo.password"
          type="email"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>

    <div class="step-btn-container">
      <el-button class="step-btn" type="primary" @click="handleNextStep"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const baseForm = useTemplateRef<FormInstance>('baseForm')
const baseInfo = ref({
  password: '',
})

const rules = reactive<FormRules<{ password: string }>>({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const validateOnSubmit = false
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
      emit('nextStep')
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
</style>
