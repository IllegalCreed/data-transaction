<template>
  <div flex flex-col>
    <span text-2xl font-bold>请您填写基本信息</span>
    <div class="form-container">
      <div flex flex-col>
        <span text-lg font-bold>基本信息</span>
        <el-form
          class="form"
          :model="baseInfo"
          :rules="rules"
          ref="baseForm"
          label-width="auto"
          label-position="top"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="baseInfo.email" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="baseInfo.password" type="password" />
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="baseInfo.confirmPassword" type="password" />
          </el-form-item>
        </el-form>
      </div>

      <person-info
        ref="personFormRef"
        v-if="registerStore.userIdentity === 'personal'"
      ></person-info>
      <enterprise-info
        ref="enterpriseFormRef"
        v-else-if="registerStore.userIdentity === 'enterprise'"
      ></enterprise-info>
    </div>

    <div class="step-btn-container">
      <el-button class="step-btn" type="primary" @click="handlePrevStep">上一步</el-button>
      <el-button class="step-btn" type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import PersonInfo from './PersonInfo.vue'
import EnterpriseInfo from './EnterpriseInfo.vue'
import { useRegisterStore } from '@/stores/modules/register'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const registerStore = useRegisterStore()
const { baseInfo } = registerStore

const baseForm = ref<FormInstance>()
const personFormRef = ref<{ validateForm: () => Promise<boolean> } | null>(null)
const enterpriseFormRef = ref<{ validateForm: () => Promise<boolean> } | null>(null)
const validateOnSubmit = true

const validateNewPwd = (rule: any, value: any, callback: any) => {
  const regex =
    /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,20}$/
  if (!regex.test(baseInfo.password)) {
    callback(new Error('密码必须大于8位，且至少包含大小写字母数字及特殊字符'))
  } else {
    callback()
  }
}

const validateRepeatPwd = (rule: any, value: any, callback: any) => {
  if (baseInfo.password !== baseInfo.confirmPassword) {
    callback(new Error('请保证两次输入的密码一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<any>>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
  ],
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

const handleSubmit = async (): Promise<boolean> => {
  if (!baseForm.value) return Promise.resolve(false)

  const baseFormValid = await new Promise<boolean>((resolve) => {
    baseForm.value?.validate((valid) => {
      resolve(valid)
    })
  })

  if (!baseFormValid) return Promise.resolve(false)

  let subFormValid = true
  if (registerStore.userIdentity === 'personal' && personFormRef.value) {
    subFormValid = await personFormRef.value.validateForm()
  } else if (registerStore.userIdentity === 'enterprise' && enterpriseFormRef.value) {
    subFormValid = await enterpriseFormRef.value.validateForm()
  }

  return subFormValid
}

const emit = defineEmits(['nextStep', 'prevStep'])
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

const handlePrevStep = () => {
  emit('prevStep')
}
</script>
<style lang="scss" scoped>
.form-container {
  @apply flex flex-row mt-4 space-x-20;

  .form {
    @apply w-80 mt-4;
  }

  @media (max-width: 100rem) {
    @apply flex-col space-x-0 self-center mt-10;
  }

  @media (max-width: 30rem) {
    .form {
      @apply w-60 mt-4;
    }
  }
}

.step-btn-container {
  @apply flex flex-row items-center mt-10;

  @media (max-width: 100rem) {
    @apply self-center;
  }

  .step-btn {
    @apply w-30 mb-10;
  }
}
</style>
