<template>
  <div class="header-root-container">
    <LogoView w-60></LogoView>
    <div flex-1></div>
    <nav space-x-10>
      <RouterLink to="/home" :class="{ active: isActive('/home') }">首页</RouterLink>
      <RouterLink to="/product" :class="{ active: isActive('/product') }">数据交易</RouterLink>
      <RouterLink to="/service" :class="{ active: isActive('/service') }">数据服务</RouterLink>
      <RouterLink to="/catalog" :class="{ active: isActive('/catalog') }">资产目录</RouterLink>
      <RouterLink to="/consult" :class="{ active: isActive('/consult') }">资产咨询</RouterLink>
      <RouterLink to="/company" :class="{ active: isActive('/company') }">数据生态</RouterLink>
      <RouterLink to="/community" :class="{ active: isActive('/community') }">社区</RouterLink>
    </nav>
    <div flex-1></div>

    <div flex flex-row justify-end items-center w-60>
      <div class="search-container" @click="showSearchDialog = true">
        <i-vaadin:search class="search-icon"></i-vaadin:search>
        <span>搜索</span>
      </div>

      <ElButton type="primary" mr-5 size="large">登录</ElButton>
      <i-vaadin:menu cursor-pointer></i-vaadin:menu>
    </div>

    <search-dialog v-model="showSearchDialog"></search-dialog>
  </div>
</template>

<script setup lang="ts">
import LogoView from './LogoView.vue'
import SearchDialog from './SearchDialog.vue';

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

const showSearchDialog = ref(false);
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

.search-container {
  @apply flex flex-row items-center mr-4 p-2 text-4 font-bold cursor-pointer text-gray-600 border-2 border-solid border-transparent rounded;


  &:hover {
    @apply border-2 border-solid border-blue-400 rounded;
  }

  .search-icon {
    @apply mr-2;
  }
}
</style>