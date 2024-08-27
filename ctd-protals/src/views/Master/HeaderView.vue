<template>
  <div class="header-root-container">
    <LogoView w-60></LogoView>
    <nav ref="navMenu" flex-1 min-w-0 flex flex-row items-center justify-center space-x-8>
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

    <div flex flex-row justify-end items-center w-60>
      <div class="search-container" @click="isSearchDialogVisible = true">
        <i-vaadin:search class="search-icon"></i-vaadin:search>
        <span>搜索</span>
      </div>

      <ElButton type="primary" mr-5 size="large">登录</ElButton>
      <i-vaadin:menu cursor-pointer @click="isDrawerMenuVisible = true"></i-vaadin:menu>
    </div>

    <search-dialog v-model="isSearchDialogVisible"></search-dialog>

    <drawer-menu v-model="isDrawerMenuVisible" />

    <!-- 隐藏的宽度计算容器 -->
    <div absolute invisible flex flex-row items-center justify-center space-x-8>
      <a
        ref="hiddenNavItems"
        v-for="link in links"
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
import type { INavMenu } from '@/types/navMenu'
import LogoView from './LogoView.vue'
import SearchDialog from './SearchDialog.vue'
import DrawerMenu from './DrawerMenu.vue'

const route = useRoute()
const router = useRouter()

const isSearchDialogVisible = ref(false)
const isDrawerMenuVisible = ref(false)

const isActive = (path: string) => {
  return route.path === path
}

// 导航链接列表
const links = [
  { path: '/home', label: '首页' },
  { path: '/product', label: '数据交易' },
  { path: '/service', label: '数据服务' },
  { path: '/catalog', label: '资产目录' },
  { path: '/consult', label: '资产咨询' },
  { path: '/company', label: '数据生态' },
  { path: '/community', label: '社区' }
]

const visibleLinks = ref<INavMenu[]>(links)
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

  for (let index in links) {
    const linkElement = hiddenNavItems.value?.[index]
    if (linkElement) {
      const linkWidth = linkElement.clientWidth + 32
      if (totalWidth + linkWidth < containerWidth) {
        totalWidth += linkWidth
        tempVisibleLinks.push(links[index])
      } else {
        tempDropdownLinks.push(...links.slice(Number(index)))
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
  @apply flex flex-row items-center h-20 w-full px-20 fixed bg-white shadow min-w-100;

  .nav-item {
    @apply text-gray-600 no-underline text-lg flex-shrink-0;
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

@media (max-width: 600px) {
  .search-container {
    display: none;
  }
}
</style>
