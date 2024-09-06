<template>
  <div class="login-control-panel">
    <span absolute top-10 left-10 text-2xl font-bold>LOGO</span>
    <span text-4xl font-bold>欢迎</span>
    <span mt-2 text-sm text-gray-400>输入用户名密码以继续</span>

    <div class="login-input-container" mt-10>
      <span ml-1 text-sm>邮箱</span>
      <el-input v-model="email" placeholder="请输入您的邮箱地址" />
    </div>

    <div class="login-input-container" mt-4>
      <span ml-1 text-sm>密码</span>
      <el-input v-model="email" placeholder="请输入您的密码" />
    </div>

    <div flex flex-row justify-between items-center w-60 mt-2>
      <el-checkbox label="记住登录状态" v-model="isRemember" />
      <span text-sm cursor-pointer select-none hover:opacity-60>忘记密码</span>
    </div>

    <el-button class="login-button" type="primary" @click="goHome">登录</el-button>
    <el-divider max-w-60><span text-xs>其他登录方式</span></el-divider>

    <oauth-link-group />

    <span text-xs mt-4
      >还没有账号？<span
        @click="goRegister"
        text-red-500
        cursor-pointer
        select-none
        hover:opacity-60
        >注册</span
      ></span
    >
  </div>
</template>

<script setup lang="ts">
import OauthLinkGroup from './OauthLinkGroup.vue'

const email = ref('')
const isRemember = ref(false)

const router = useRouter()

const goHome = () => {
  router.push('/home')
}

const goRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.login-control-panel {
  @apply flex flex-col items-center justify-center flex-1 py-20 bg-gray-100 rounded-3xl relative;

  .login-input-container {
    @apply flex flex-col w-60 space-y-1;
  }

  .login-button {
    @apply w-60 mt-6;
  }

  :deep(.el-divider__text) {
    @apply bg-gray-100;
  }

  @media (max-width: 40rem) {
    @apply rounded-none min-h-100vh;
  }
}
</style>
