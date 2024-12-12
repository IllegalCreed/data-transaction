<template>
  <div class="login-control-panel-root-container">
    <img :src="icon" class="logo" h-15 w-15 object-contain />
    <div class="login-control-panel">
      <span class="title">欢迎</span>
      <span class="desc">输入用户名密码以继续</span>

      <el-form
        @submit.prevent
        class="form"
        :model="loginInfo"
        :rules="rules"
        ref="loginForm"
        label-width="auto"
        label-position="top"
      >
        <el-form-item label="用户名" prop="email">
          <el-input
            data-testid="email-input"
            v-model="loginInfo.email"
            placeholder="请输入您的邮箱地址"
            @blur="checkCaptcha"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            data-testid="password-input"
            v-model="loginInfo.password"
            type="password"
            placeholder="请输入您的密码"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item
          v-if="captchaVisible"
          label="验证码"
          prop="captchaCode"
          :rules="{
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          }"
        >
          <div flex flex-row>
            <el-input
              flex-1
              data-testid="captcha-input"
              v-model="loginInfo.captchaCode"
              placeholder="验证码"
              @keyup.enter="handleLogin"
            />
            <img
              w-25
              object-contain
              cursor-pointer
              :src="captchaData"
              @click="getCaptcha"
            />
          </div>
        </el-form-item>
      </el-form>

      <div flex flex-row justify-between items-center w-60>
        <el-checkbox
          data-testid="remember-me-checkbox"
          label="记住登录状态"
          v-model="remeberMe"
        />
        <span class="forgot" @click="goForgot">忘记密码</span>
      </div>

      <el-button
        data-testid="login-button"
        class="login-button"
        type="primary"
        :loading="loginActionLoading"
        @click="handleLogin"
        >登录</el-button
      >
      <div flex flex-row items-center gap-4 w-60>
        <el-divider></el-divider>
        <span text-xs flex-shrink-0>其他登录方式</span>
        <el-divider></el-divider>
      </div>

      <oauth-link-group />

      <span text-xs mt-4
        >还没有账号？<span @click="goRegister" class="register"
          >注册</span
        ></span
      >

      <div flex flex-col mt-4 text-xs>
        <span>testusereoC2ETRQ@example.com</span>
        <span>Password@123!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ILogin } from '@/types/login'
import OauthLinkGroup from './OauthLinkGroup.vue'
import { useTokenStore } from '@/stores/modules/token'
import { useAccountStore } from '@/stores/modules/account'

const accountStore = useAccountStore()
const {
  login: loginAction,
  getCaptcha: getCaptchaAction,
  checkCaptcha: checkCaptchaAction,
} = accountStore
const tokenStore = useTokenStore()
const { remeberMe } = storeToRefs(tokenStore)

const icon = new URL('@/assets/icon/logo.png', import.meta.url).href

const loginInfo = ref<ILogin>({
  email: '',
  password: '',
  captchaCode: undefined,
  captchaId: undefined,
})
const captchaVisible = ref(false)
const captchaData = ref<string>()

// 表单验证规则
const validateOnSubmit = true
import type { FormInstance, FormRules } from 'element-plus'
import type { ICommonReturn } from '@/axios/type'
const loginForm = useTemplateRef<FormInstance>('loginForm')

const rules = reactive<FormRules<ILogin>>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const validateForm = async (): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    if (loginForm.value) {
      loginForm.value.validate(valid => {
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

const { isLoading: loginActionLoading, execute: executeLoginAction } =
  useAsyncState(loginAction, undefined, {
    immediate: false,
    throwError: true,
  })

const router = useRouter()
const handleLogin = async () => {
  if (validateOnSubmit) {
    if (await validateForm()) {
      try {
        await executeLoginAction(0, loginInfo.value)
        router.push('/home')
      } catch (error) {
        if (import.meta.env.VITE_BACK_TYPE === 'java') {
          ElMessage.error('登录失败')
        } else {
          const res = error as ICommonReturn<{
            token?: string
            requiresCaptcha?: boolean
          }>
          if (res.data?.requiresCaptcha) {
            getCaptcha()
          } else {
            closeCaptcha()
          }
        }
      }
    }
  } else {
    router.push('/home')
  }
}

const getCaptcha = async () => {
  try {
    const captcha = await getCaptchaAction()
    loginInfo.value.captchaId = captcha.id
    captchaData.value = captcha.data
    captchaVisible.value = true
  } catch {
    ElMessage.error('获取验证码失败')
  }
}

const closeCaptcha = () => {
  loginInfo.value.captchaId = undefined
  captchaData.value = undefined
  captchaVisible.value = false
}

const checkCaptcha = async () => {
  if (import.meta.env.VITE_BACK_TYPE === 'java') {
  } else {
    try {
      const needShowCaptcha = await checkCaptchaAction(loginInfo.value.email)
      if (needShowCaptcha) {
        getCaptcha()
      } else {
        closeCaptcha()
      }
    } catch {
      closeCaptcha()
    }
  }
}

const goRegister = () => {
  router.push('/register')
}

const goForgot = () => {
  router.push('/forgot')
}
</script>

<style lang="scss" scoped>
.login-control-panel-root-container {
  @apply flex-1 flex flex-col items-center justify-center;

  .logo {
    @apply absolute top-8 left-10 text-2xl font-bold z-10;
  }

  .login-control-panel {
    @apply flex flex-col items-center justify-center p-20 rounded relative shadow backdrop-blur-sm;

    .title {
      @apply text-4xl font-bold;
    }

    .desc {
      @apply mt-2 text-sm text-[var(--color-text-lighter)];
    }

    .form {
      @apply w-60 mt-5;
    }

    .forgot {
      @apply text-sm cursor-pointer text-[var(--color-primary)] select-none hover:opacity-60;
    }

    .register {
      @apply text-[var(--color-primary)] cursor-pointer select-none hover:opacity-60;
    }

    .login-button {
      @apply w-60 mt-6;
    }
  }

  @media (max-width: 40rem) {
    @apply items-stretch justify-stretch;

    .logo {
      @apply top-5 left-5;
    }

    .login-control-panel {
      @apply rounded-none min-h-100vh px-5;
    }
  }
}
</style>
