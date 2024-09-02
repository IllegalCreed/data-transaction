<template>
  <div class="login-root-container">
    <span mb-20 text-6xl font-bold tracking-widest> 文旅数据平台管理端 </span>
    <el-input v-model="loginform.account" class="login-input" placeholder="账号" />
    <el-input
      v-model="loginform.password"
      class="login-input"
      type="password"
      placeholder="密码"
      show-password
    />

    <div flex flex-row justify-start items-center w-60 m-2>
      <el-input v-model="loginform.code" flex-1 placeholder="验证码" />
      <img :src="codeUrl" @click="getCode" cursor-pointer w-20 h-8 ml-2 bg-gray rounded />
    </div>
    <el-button class="login-btn" type="primary" @click="Login" :loading="loginLoading"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/modules/account'
import type { ILogin } from '@/types/Login'
const { login: loginAction, getCode: getCodeAction } = useAccountStore()
const router = useRouter()

const codeUrl = ref('')
const loginform = ref<ILogin>({
  account: '',
  password: '',
  code: '',
  uuid: ''
})
const loginLoading = ref(false)

function getCode() {
  getCodeAction().then((res: any) => {
    codeUrl.value = 'data:image/gif;base64,' + res.img
    loginform.value.uuid = res.uuid
  })
}

function Login() {
  loginLoading.value = true
  loginAction(loginform.value)
    .then(() => {
      router.push({
        name: 'user'
      })
    })
    .catch((error) => {
      getCode()
    })
    .finally(() => {
      loginLoading.value = false
    })
}

getCode()
</script>

<style scoped>
.login-root-container {
  @apply flex flex-col items-center justify-center w-screen h-screen;
}

.login-input {
  @apply w-60 m-2;
}

.login-btn {
  @apply w-25 mt-12;
}
</style>
