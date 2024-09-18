<template>
  <div class="mine-view-container">
    <!-- 左侧导航菜单 -->
    <el-menu
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      class="menu-container"
      @select="handleMenuSelect"
      router
    >
      <template v-for="item in personalMenuLinks">
        <!-- 有子菜单的项 -->
        <el-sub-menu
          v-if="item.children && item.children.length"
          :key="item.path + '-submenu'"
          :index="item.path"
        >
          <template #title>
            <el-icon><i :class="item.icon"></i></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <!-- 子菜单项 -->
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <el-icon><i :class="child.icon"></i></el-icon>
            <span>{{ child.label }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 无子菜单的项 -->
        <el-menu-item v-else :key="item.path + '-menuitem'" :index="item.path">
          <el-icon><i :class="item.icon"></i></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>

    <!-- 右侧内容区域 -->
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/stores/modules/menu'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { personalMenuLinks } = useMenuStore()

const route = useRoute()
const router = useRouter()
const activeMenu = ref('')

// 设置默认展开的菜单项
const defaultOpeneds = ref<string[]>([])

const setDefaultOpeneds = () => {
  defaultOpeneds.value = personalMenuLinks
    .filter((item) => item.children && item.children.length)
    .map((item) => item.path)
}

// 初始化默认展开的菜单项
setDefaultOpeneds()

// 根据当前路由设置激活的菜单项
const setActiveMenu = () => {
  activeMenu.value = route.path
}

// 监听路由变化，更新激活的菜单项
watch(
  () => route.path,
  () => {
    setActiveMenu()
  }
)

// 初始化激活菜单
setActiveMenu()

// 处理菜单选择事件
const handleMenuSelect = (path: string) => {
  router.push(path)
}
</script>
<style scoped lang="scss">
.mine-view-container {
  @apply flex flex-row h-full min-h-200 mb--20;

  .menu-container {
    @apply self-start w-50 sticky top-1/2 transform translate-y-[calc(-50%+40px)];
  }

  .content-container {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
}
</style>
