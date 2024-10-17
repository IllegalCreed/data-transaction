<template>
  <div class="login-control-panel-root-container">
    <span class="logo">LOGO</span>
    <div class="login-control-panel">
      <span class="title">欢迎</span>
      <span class="desc">输入用户名密码以继续</span>

      <div class="login-input-container" mt-10>
        <span ml-1 text-sm>邮箱</span>
        <el-input v-model="email" placeholder="请输入您的邮箱地址" />
      </div>

      <div class="login-input-container" mt-4>
        <span ml-1 text-sm>密码</span>
        <el-input v-model="password" type="password" placeholder="请输入您的密码" />
      </div>

      <div flex flex-row justify-between items-center w-60 mt-2>
        <el-checkbox label="记住登录状态" v-model="isRemember" />
        <span class="forgot" @click="goForgot">忘记密码</span>
      </div>

      <el-button class="login-button" type="primary" @click="goHome">登录</el-button>
      <div flex flex-row items-center gap-4 w-60>
        <el-divider></el-divider>
        <span text-xs flex-shrink-0>其他登录方式</span>
        <el-divider></el-divider>
      </div>

      <oauth-link-group />

      <span text-xs mt-4>还没有账号？<span @click="goRegister" class="register">注册</span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import OauthLinkGroup from './OauthLinkGroup.vue'

const email = ref('')
const password = ref('')
const isRemember = ref(false)

const router = useRouter()

const goHome = () => {
  router.push('/home')
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
    @apply absolute top-10 left-10 text-2xl font-bold z-10;
  }

  .login-control-panel {
    @apply flex flex-col items-center justify-center p-20 rounded relative shadow backdrop-blur-sm;

    .title {
      @apply text-4xl font-bold;
    }

    .desc {
      @apply mt-2 text-sm text-[var(--color-text-lighter)];
    }

    .forgot {
      @apply text-sm cursor-pointer text-[var(--color-primary)] select-none hover:opacity-60;
    }

    .register {
      @apply text-[var(--color-primary)] cursor-pointer select-none hover:opacity-60;
    }

    .login-input-container {
      @apply flex flex-col w-60 space-y-1;
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
