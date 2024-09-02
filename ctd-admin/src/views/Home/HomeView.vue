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
          <span v-show="showText" text-5 font-bold>文旅平台管理端</span>
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
          @select="handleSelect"
          :default-active="activeIndex"
          :collapse="isCollapse"
        >
          <el-menu-item v-for="menu in menuItems" :key="menu.index" :index="menu.index">
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            <template #title>
              <span text-4>{{ menu.label }}</span>
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
import {
  RouterView,
  useRouter,
  type RouteLocationNormalized,
  type _RouteLocationBase
} from 'vue-router'
import HeaderView from './HeaderView.vue'
import { ref } from 'vue'
import { useRouterStore } from '@/stores/modules/router'
const { cachedViews } = useRouterStore()
const router = useRouter()

const isCollapse = ref(false)
const showText = ref(true)
watch(isCollapse, (value) => {
  if (value) {
    showText.value = false
  } else {
    setTimeout(() => {
      showText.value = true
    }, 300)
  }
})

const activeIndex = ref('user')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
  router.push({
    name: key
  })
}

const setCurrentMenu = (route: _RouteLocationBase) => {
  if (route.name === 'home') {
    return
  }
  activeIndex.value = route.meta.belong as string
}

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  setCurrentMenu(to)
})

setCurrentMenu(router.currentRoute.value)

// 菜单项数据
const menuItems = ref([
  { index: 'user', label: '用户管理', icon: 'i-vaadin:users' },
  { index: 'product', label: '产品管理', icon: 'i-vaadin:package' },
  { index: 'demand', label: '需求管理', icon: 'i-vaadin:paperplane' },
  { index: 'setting', label: '系统配置', icon: 'i-vaadin:cog' }
])
</script>

<style scoped>
.home-root-container {
  width: 100vw;
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
}

.home-menu-header {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--border);
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
  background-color: var(--page-background-dark-color);
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
