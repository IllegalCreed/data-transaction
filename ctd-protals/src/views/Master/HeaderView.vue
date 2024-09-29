<template>
  <div class="header-root-container">
    <LogoView w-30></LogoView>
    <nav class="nav-menu" ref="navMenu">
      <RouterLink
        v-for="link in visibleLinks"
        :key="link.path"
        :to="link.path"
        class="nav-item"
        :class="{ active: isActive(link.path) }"
      >
        {{ link.label }}
      </RouterLink>
      <el-dropdown v-if="dropdownLinks.length > 0 && visibleLinks.length > 0" ml-8 trigger="click">
        <div flex justify-center items-center p-1>
          <i-lucide:ellipsis cursor-pointer />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="link in dropdownLinks"
              :key="link.path"
              @click="navigateTo(link.path)"
            >
              {{ link.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </nav>

    <div flex flex-row justify-end items-center w-30>
      <div class="search-container" @click="isSearchDialogVisible = true">
        <i-vaadin:search class="search-icon" h-5 w-5></i-vaadin:search>
        <span>搜索</span>
      </div>

      <!-- <ElButton type="primary" mr-5 size="large">登录</ElButton> -->
      <i-vaadin:menu cursor-pointer h-5 w-5 @click="isDrawerMenuVisible = true"></i-vaadin:menu>
    </div>

    <search-dialog v-model="isSearchDialogVisible"></search-dialog>

    <drawer-menu v-model="isDrawerMenuVisible" />

    <!-- 隐藏的宽度计算容器 -->
    <div absolute invisible flex flex-row items-center justify-center space-x-8>
      <a
        ref="hiddenNavItems"
        v-for="link in moduleMenuLinks"
        :key="link.path"
        :to="link.path"
        class="nav-item"
      >
        {{ link.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/modules/menu'
import type { INavMenu } from '@/types/navMenu'
import LogoView from './LogoView.vue'
import SearchDialog from './Search/SearchDialog.vue'
import DrawerMenu from './DrawerMenu.vue'

const route = useRoute()
const router = useRouter()

const isSearchDialogVisible = ref(false)
const isDrawerMenuVisible = ref(false)

const { moduleMenuLinks } = useMenuStore()

const isActive = (path: string) => {
  return route.path === path
}

const visibleLinks = ref<INavMenu[]>(moduleMenuLinks)
const dropdownLinks = ref<INavMenu[]>([])

// 获取导航菜单的容器和每个菜单项的引用
const navMenu = ref<HTMLElement | null>(null)
const hiddenNavItems = ref<HTMLElement[]>([])

// 计算可见的菜单项数量
const updateMenu = () => {
  if (!navMenu.value) return

  const dropdownWidth = 56
  let containerWidth = navMenu.value.clientWidth + 32
  let totalWidth = 0

  hiddenNavItems.value.forEach((item) => {
    totalWidth += item.clientWidth + 32
  })

  if (totalWidth > containerWidth) {
    containerWidth -= dropdownWidth // 如果超宽，需要减去 el-dropdown 的宽度
  }

  totalWidth = 0
  const tempVisibleLinks: INavMenu[] = []
  const tempDropdownLinks: INavMenu[] = []

  for (let index in moduleMenuLinks) {
    const linkElement = hiddenNavItems.value?.[index]
    if (linkElement) {
      const linkWidth = linkElement.clientWidth + 32
      if (totalWidth + linkWidth < containerWidth) {
        totalWidth += linkWidth
        tempVisibleLinks.push(moduleMenuLinks[index])
      } else {
        tempDropdownLinks.push(...moduleMenuLinks.slice(Number(index)))
        break
      }
    }
  }

  visibleLinks.value = tempVisibleLinks
  dropdownLinks.value = tempDropdownLinks
}

const navigateTo = (path: string) => {
  router.push(path)
}

onMounted(() => {
  updateMenu()
  window.addEventListener('resize', updateMenu)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMenu)
})
</script>

<style scoped lang="scss">
.header-root-container {
  @apply flex flex-row items-center h-20 w-full px-20 fixed bg-white shadow min-w-80;

  .nav-menu {
    @apply flex-1 min-w-0 mx-10 flex flex-row items-center justify-center space-x-8;
  }

  .nav-item {
    @apply text-gray-600 no-underline text-lg flex-shrink-0;
  }

  .nav-item.active {
    @apply text-red-600;
  }
}

.ellipsis-menu {
  @apply hidden;
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

@media (max-width: 40rem) {
  .header-root-container {
    @apply justify-between px-10 h-15;

    .nav-menu {
      @apply hidden;
    }
  }

  .search-container {
    @apply hidden;
  }
}
</style>
