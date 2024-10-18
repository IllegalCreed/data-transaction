<template>
  <div v-if="isLoading" class="activation-loading">
    <i-eos-icons:loading h-12 w-12 />
    <h2>正在激活您的账号，请稍候...</h2>
  </div>

  <div v-else-if="isActivationSuccess" class="activation-success">
    <i-carbon:checkmark-outline h-16 w-16 text-green-600></i-carbon:checkmark-outline>
    <h2>账号激活成功</h2>
    <p text-sm text-center text-gray-500 max-w-120>
      您的账号已成功激活，您现在可以使用您的邮箱和密码登录。
    </p>
    <!-- 跳转到登录页按钮 -->
    <el-button type="primary" @click="goToLogin" mt-4>前往登录</el-button>
  </div>

  <div v-else class="activation-failed">
    <i-carbon:warning h-16 w-16 text-red-600></i-carbon:warning>
    <h2>激活失败</h2>
    <p text-sm text-center text-gray-500 max-w-120>激活链接已过期或无效，无法完成激活。</p>
    <p text-sm text-center text-gray-500 max-w-120>
      您可以点击下方按钮重新发送激活邮件到 <strong>{{ email }}</strong
      >。
    </p>
    <!-- 重新发送激活邮件按钮 -->
    <el-button type="primary" @click="resendActivationEmail" mt-4>重新发送激活邮件</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

// 定义状态
const isActivationSuccess = ref(false)
const isLoading = ref(true) // 激活中的状态
const email = ref('')

// 获取 token
const token = inject<string>('token')

// 路由器实例
const router = useRouter()

// 模拟 API 调用验证激活链接
const verifyActivation = async (token: string) => {
  try {
    const response = await fakeApiVerifyToken(token)
    if (response.success) {
      isActivationSuccess.value = true
    } else {
      isActivationSuccess.value = false
      email.value = response.email
    }
  } catch {
    isActivationSuccess.value = false
    ElMessage.error('激活失败，请稍后再试。')
  } finally {
    isLoading.value = false // 无论成功或失败，都切换加载状态
  }
}

// 模拟 API 请求
const fakeApiVerifyToken = (token: string): Promise<{ success: boolean; email: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: token === '123', // 模拟成功或失败
        email: 'user@example.com' // 当失败时返回 email
      })
    }, 2000) // 模拟 2 秒的延迟
  })
}

// 获取 token 并验证
onMounted(() => {
  if (token) {
    verifyActivation(token)
  } else {
    isLoading.value = false
    isActivationSuccess.value = false
  }
})

// 返回登录页函数
const goToLogin = () => {
  router.push('/login')
}

const emit = defineEmits(['prevStep'])
// 模拟重新发送激活邮件的函数
const resendActivationEmail = async () => {
  try {
    emit('prevStep')
    ElMessage.success('激活邮件已重新发送，请检查您的邮箱。')
  } catch {
    ElMessage.error('重新发送激活邮件失败，请稍后重试。')
  }
}
</script>

<style lang="scss" scoped>
.activation-loading,
.activation-success,
.activation-failed {
  @apply flex flex-col items-center justify-center;
}
</style>
