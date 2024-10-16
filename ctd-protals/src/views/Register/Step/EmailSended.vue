<template>
  <div class="email-verification">
    <i-carbon:checkmark-outline h-12 w-12 text-green-600></i-carbon:checkmark-outline>
    <h2>验证邮件已发送</h2>
    <p text-sm text-center text-gray-500 max-w-120>
      我们已经向您的注册邮箱
      <strong>{{ accountStore.baseInfo.email }}</strong> 发送了一封验证邮件。
      请前往您的邮箱，找到我们的邮件，并点击邮件中的链接以激活您的账号。
    </p>
    <p text-sm text-center text-gray-500>
      如果您没有收到邮件，请检查您的垃圾邮件文件夹或稍后再试。
    </p>

    <el-button mt-10 type="primary" @click="goToLogin">返回登录页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.email-verification {
  @apply flex flex-col items-center justify-center;
}
</style>
