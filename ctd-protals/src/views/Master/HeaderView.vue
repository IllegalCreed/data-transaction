<template>
  <div class="header-root-container">
    <LogoView w-40></LogoView>
    <div flex-1></div>
    <nav space-x-10>
      <RouterLink to="home" class="active">首页</RouterLink>
      <RouterLink to="data">数据</RouterLink>
      <RouterLink to="scene">场景</RouterLink>
      <RouterLink to="service">服务</RouterLink>
      <RouterLink to="community">社区</RouterLink>
    </nav>
    <div flex-1></div>

    <div flex flex-row-reverse items-center w-40>
      <i-vaadin:menu></i-vaadin:menu>
      <ElButton type="primary" mr-5>登录</ElButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import LogoView from './LogoView.vue'
</script>

<style scoped lang="scss">
.header-root-container {
  @apply flex flex-row items-center h-20 w-full px-20 fixed bg-white shadow;



  a {
    @apply text-gray-600 no-underline text-lg;
  }

  a.active {
    @apply text-green-600;
  }
}
</style>