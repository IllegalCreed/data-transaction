<template>
  <div class="mine-view-container">
    <!-- 左侧导航菜单 -->
    <el-menu
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      class="menu-container"
      @select="handleMenuSelect"
      router
      :collapse="isCollapsed"
    >
      <template v-for="item in mineMenus">
        <!-- 有子菜单的项 -->
        <el-sub-menu
          v-if="item.children && item.children.length"
          :key="item.path + '-submenu'"
          :index="item.path"
        >
          <template #title>
            <el-icon><i :class="item.icon" class="icon"></i></el-icon>
            <span class="title">{{ item.label }}</span>
          </template>
          <!-- 子菜单项 -->
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
          >
            <el-icon><i :class="child.icon" class="icon"></i></el-icon>
            <span class="title">{{ child.label }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 无子菜单的项 -->
        <el-menu-item v-else :key="item.path + '-menuitem'" :index="item.path">
          <el-icon><i :class="item.icon" class="icon"></i></el-icon>
          <span class="title">{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>

    <!-- 右侧内容区域 -->
    <div class="content-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/stores/modules/menu'
const menuStore = useMenuStore()
const { mineMenus } = storeToRefs(menuStore)
const { getMineMenus: getMineMenusAction } = menuStore

const route = useRoute()
const router = useRouter()
const activeMenu = ref('')

const defaultOpeneds = ref<string[]>([])
const setDefaultOpeneds = () => {
  if (mineMenus.value) {
    defaultOpeneds.value = mineMenus.value
      .filter(item => item.children && item.children.length)
      .map(item => item.path)
  }
}
watch(mineMenus, () => {
  setDefaultOpeneds()
})

const setActiveMenu = () => {
  activeMenu.value = route.path
}

watch(
  () => route.path,
  () => {
    setActiveMenu()
  },
)

setActiveMenu()

const handleMenuSelect = (path: string) => {
  router.push(path)
}

const isMobileDevice = useMediaQuery('(max-width: 60rem)')
const isCollapsed = ref(false)

watchEffect(() => {
  if (isMobileDevice.value) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
})

onMounted(() => {
  getMineMenusAction()
})
</script>
<style scoped lang="scss">
.mine-view-container {
  @apply flex flex-row self-center h-full min-h-200 max-w-300 w-full;

  .menu-container {
    @apply self-start sticky top-30 h-[calc(100vh-10rem)] border-r-0 overflow-hidden p-5;

    &:not(.el-menu--collapse) {
      @apply w-60;
    }

    &.el-menu--collapse {
      @apply p-0;
    }

    .title {
      @apply text-base ml-4;
    }

    .icon {
      @apply text-2xl;
    }

    @media (max-width: 40rem) {
      @apply hidden;
    }
  }

  .content-container {
    @apply flex-1 ml-5 mt-10 min-h-100vh bg-[var(--color-background-alternating)];

    @media (max-width: 40rem) {
      @apply ml-0 mt-0;
    }
  }
}
</style>
