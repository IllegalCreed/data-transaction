<template>
  <div class="login-root-container">
    <span mb-20 text-6xl font-bold tracking-widest> 文旅数据平台管理端 </span>
    <el-form
      @submit.prevent
      class="form"
      :model="loginInfo"
      :rules="rules"
      ref="loginForm"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginInfo.username" class="login-input" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          class="login-input"
          v-model="loginInfo.password"
          type="password"
          placeholder="请输入密码"
          @keyup.enter="handleLogin"
        />
      </el-form-item>

      <el-form-item
        label="验证码"
        prop="captchaCode"
        :rules="{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }"
      >
        <div flex flex-row>
          <el-input
            flex-1
            v-model="loginInfo.captchaCode"
            placeholder="验证码"
            @keyup.enter="handleLogin"
          />
          <img w-25 object-contain cursor-pointer :src="captchaData" @click="getCaptcha" />
        </div>
      </el-form-item>
    </el-form>

    <el-button
      data-testid="login-button"
      class="login-button"
      type="primary"
      :loading="loginActionLoading"
      @click="handleLogin"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/modules/account'
const { login: loginAction, getCaptcha: getCaptchaAction } = useAccountStore()
const { isLoading: loginActionLoading, execute: executeLoginAction } = useAsyncState(
  () => loginAction(loginInfo.value),
  undefined,
  {
    immediate: false,
    throwError: true
  }
)

import type { ILogin } from '@/types/login'
const captchaData = ref<string>()
const loginInfo = ref<ILogin>({
  username: '',
  password: '',
  captchaId: '',
  captchaCode: ''
})

// 表单验证规则
const validateOnSubmit = true
import type { FormInstance, FormRules } from 'element-plus'
const loginForm = useTemplateRef<FormInstance>('loginForm')

const rules = reactive<FormRules<ILogin>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const validateForm = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    if (loginForm.value) {
      loginForm.value.validate((valid) => {
        if (valid) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })
}

const getCaptcha = async () => {
  const captcha = await getCaptchaAction()
  loginInfo.value.captchaId = captcha.id
  captchaData.value = captcha.data
}

const router = useRouter()
const handleLogin = async () => {
  if (validateOnSubmit) {
    if (await validateForm()) {
      try {
        await executeLoginAction()
        router.push('/home')
      } catch (error: unknown) {
        if (error instanceof Error) {
          ElMessage.error('登录失败')
        }
      }
    }
  } else {
    router.push('/home')
  }
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="scss" scoped>
.login-root-container {
  @apply flex flex-col items-center justify-center w-screen h-screen;

  .form {
    @apply w-60 mt-5;
  }

  .login-button {
    @apply w-60 mt-6;
  }
}
</style>
