<template>
  <img :src="icon" @click="redirectToOauth" cursor-pointer />
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
