<template>
  <div class="home-root-container">
    <HeaderView></HeaderView>
    <div class="home-center-container">
      <div flex flex-col items-stretch justify-stretch>
        <div
          flex
          flex-row
          justify-stretch
          items-center
          pr-5
          h-12
          transition-all
          duration-300
          :style="{
            width: isCollapse ? '4rem' : '18rem',
            'padding-left': isCollapse ? '1.25rem' : '3rem'
          }"
          class="home-menu-header"
        >
          <span v-show="showText" text-5 font-bold>文旅商家管理端</span>
          <div flex-1></div>
          <i-oi:collapse-left
            v-if="!isCollapse"
            @click="isCollapse = true"
            w-4
            h-4
            mx-1
          ></i-oi:collapse-left>
          <i-oi:collapse-right
            v-else
            @click="isCollapse = false"
            w-4
            h-4
            mx-1
          ></i-oi:collapse-right>
        </div>
        <el-menu
          class="home-menu"
          @select="handleMenuSelect"
          :default-active="activeMenu"
          router
          :collapse="isCollapse"
        >
          <el-menu-item v-for="item in mainMenus" :key="item.path" :index="item.path">
            <el-icon><i :class="item.icon" class="icon"></i></el-icon>
            <template #title>
              <span text-lg ml-10>{{ item.label }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <div flex-1 flex flex-col min-w-0>
        <HistoryTab></HistoryTab>
        <div class="router-container">
          <RouterView v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderView from './HeaderView.vue'
import { useRouterStore } from '@/stores/modules/router'
const { cachedViews } = useRouterStore()

const route = useRoute()
const router = useRouter()
const activeMenu = ref('')

const isCollapse = ref<boolean>(false)
const showText = ref<boolean>(true)
watch(isCollapse, (value: boolean) => {
  if (value) {
    showText.value = false
  } else {
    setTimeout(() => {
      showText.value = true
    }, 300)
  }
})

const handleMenuSelect = (path: string) => {
  router.push(path)
}

const setActiveMenu = () => {
  if (route.meta.belong) {
    activeMenu.value = route.meta.belong as string
    return
  }
  activeMenu.value = route.path
}

watch(
  () => route.path,
  () => {
    setActiveMenu()
  }
)

setActiveMenu()

import { useMenuStore } from '@/stores/modules/menu'
const menuStore = useMenuStore()
const { mainMenus } = storeToRefs(menuStore)
const { getMainMenus: getMainMenusAction } = menuStore
onMounted(() => {
  getMainMenusAction()
})
</script>

<style lang="scss" scoped>
.home-root-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
}

.home-center-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
}

.home-menu {
  flex: 1;
  min-height: 0;

  .icon {
    @apply text-2xl;
  }
}

.home-menu-header {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--border-color);
}

.home-menu:not(.el-menu--collapse) {
  width: 18rem;
}

:deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--el-color-primary);
}

:deep(.el-menu) {
  background-color: var(--menu-background);
}

:deep(.el-menu-item.is-active) {
  color: var(--menu-active-text-color);
}

:deep(.el-menu-item) {
  color: var(--menu-text-color);
}

:deep(.el-menu-item:hover) {
  background-color: var(--menu-hover);
}

.router-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: var(--background-page-dark-color);
  overflow-y: scroll;
}

.router-container::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
