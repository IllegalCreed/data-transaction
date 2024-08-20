<template>
  <div class="header-root-container">
    <LogoView w-40></LogoView>
    <div flex-1></div>
    <nav space-x-10>
      <RouterLink to="home" :class="{ active: isActive('/home') }">首页</RouterLink>
      <RouterLink to="product" :class="{ active: isActive('/product') }">数据交易</RouterLink>
      <RouterLink to="service" :class="{ active: isActive('/service') }">数据服务</RouterLink>
      <RouterLink to="catalog" :class="{ active: isActive('/catalog') }">资产目录</RouterLink>
      <RouterLink to="consult" :class="{ active: isActive('/consult') }">资产咨询</RouterLink>
      <RouterLink to="company" :class="{ active: isActive('/company') }">数据生态</RouterLink>
      <RouterLink to="community" :class="{ active: isActive('/community') }">社区</RouterLink>
    </nav>
    <div flex-1></div>

    <div flex flex-row justify-end items-center w-40>
      <ElButton type="primary" mr-5>登录</ElButton>
      <i-vaadin:menu cursor-pointer></i-vaadin:menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoView from './LogoView.vue'

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<style scoped lang="scss">
.header-root-container {
  @apply flex flex-row items-center h-20 w-full px-20 fixed bg-white shadow min-w-1200px;

  a {
    @apply text-gray-600 no-underline text-lg;
  }

  a.active {
    @apply text-green-600;
  }
}
</style>