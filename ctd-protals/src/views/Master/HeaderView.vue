<template>
  <div class="header-root-container">
    <LogoView w-60></LogoView>
    <div flex-1></div>
    <nav flex flex-row items-center space-x-8>
      <RouterLink v-for="link in links" :key="link.path" :to="link.path" class="nav-item"
        :class="{ active: isActive(link.path) }">
        {{ link.label }}
      </RouterLink>
      <el-dropdown class="ellipsis-menu" trigger="click">
        <i-lucide:ellipsis class="ellipsis-icon"></i-lucide:ellipsis>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="link in links.slice(3)" :key="link.path" @click="navigateTo(link.path)">
              {{ link.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

// 导航链接列表
const links = [
  { path: '/home', label: '首页' },
  { path: '/product', label: '数据交易' },
  { path: '/service', label: '数据服务' },
  { path: '/catalog', label: '资产目录' },
  { path: '/consult', label: '资产咨询' },
  { path: '/company', label: '数据生态' },
  { path: '/community', label: '社区' },
];

const route = useRoute();
const router = useRouter();

const isActive = (path: string) => {
  return route.path === path;
};

const navigateTo = (path: string) => {
  router.push(path);
};

const showSearchDialog = ref(false);
</script>

<style scoped lang="scss">
.header-root-container {
  @apply flex flex-row items-center h-20 w-full px-20 fixed bg-white shadow min-w-100;

  .nav-item {
    @apply text-gray-600 no-underline text-lg;
  }

  .nav-item.active {
    @apply text-green-600;
  }
}

.ellipsis-menu {
  display: none;
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

@media (max-width: 1280px) {
  .nav-item:nth-child(n+4) {
    display: none;
  }

  .ellipsis-menu {
    display: inline-block;
  }
}

@media (max-width: 1000px) {
  .nav-item {
    display: none;
  }

  .ellipsis-menu {
    display: none;
  }
}

@media (max-width: 600px) {
  .search-container {
    display: none;
  }
}
</style>