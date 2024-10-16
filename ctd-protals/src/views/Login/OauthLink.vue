<template>
  <el-button circle size="large" @click="redirectToOauth">
    <i :class="icon" text-2xl></i>
  </el-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  url: string
}>()

// 跳转到指定的 OAuth2 链接
const redirectToOauth = () => {
  window.location.href = props.url
}
</script>

<style scoped lang="scss"></style>
