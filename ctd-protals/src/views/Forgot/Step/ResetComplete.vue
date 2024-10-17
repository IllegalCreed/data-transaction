<template>
  <div flex flex-col items-center>
    <img :src="bg" w-20 h-20 object-contain />
    <span class="title">完成</span>
    <p class="desc">您的密码已经重置完成，请返回登录</p>

    <el-button type="primary" @click="goToLogin" w-60>前往登录</el-button>
  </div>
</template>

<script setup lang="ts">
const bg = new URL('@/assets/icon/forgot/complete.png', import.meta.url).href

const router = useRouter()
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
.title {
  @apply text-2xl font-bold mt-5;
}

.desc {
  @apply text-sm text-[var(--color-text-lighter)] mb-20;
}
</style>
