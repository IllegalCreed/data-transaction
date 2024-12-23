<template>
  <div flex flex-col items-center>
    <i-carbon:checkmark-outline h-12 w-12 text-green-600 mt-10></i-carbon:checkmark-outline>
    <span text-3xl font-bold mt-4>完成</span>
    <p text-sm text-gray-400>您的验证邮箱已经修改完成，请返回登录</p>

    <el-button type="primary" @click="close" w-60 mt-10>关闭</el-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['complete'])

const close = () => {
  emit('complete')
}
</script>

<style scoped lang="scss"></style>
