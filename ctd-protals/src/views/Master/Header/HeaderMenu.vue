<template>
  <nav class="nav-menu-container nav-menu" ref="menuContainer">
    <RouterLink
      v-for="link in visibleLinks"
      :key="link.path"
      :to="link.path"
      class="nav-item"
      :class="{ active: isActive(link.path) }"
    >
      {{ link.label }}
    </RouterLink>
    <el-dropdown v-if="dropdownLinks.length > 0 && visibleLinks.length > 0" trigger="click">
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

  <!-- 隐藏的宽度计算容器 -->
  <div class="nav-menu-container shadow-menu">
    <a
      v-for="link in mainMenus"
      ref="shadowMenuItemsRef"
      :key="link.path"
      :to="link.path"
      class="nav-item"
    >
      {{ link.label }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/modules/menu'
const menuStore = useMenuStore()
const { mainMenus } = storeToRefs(menuStore)
const { getMainMenus: getMainMenusAction } = menuStore

const route = useRoute()
const router = useRouter()

const isActive = (path: string) => {
  return route.meta.belong === path
}

const navigateTo = (path: string) => {
  router.push(path)
}

const menuContainer = useTemplateRef('menuContainer')
const shadowMenuItemsRef = useTemplateRef<HTMLAnchorElement[]>('shadowMenuItemsRef')

const { visibleLinks, dropdownLinks } = useResponsiveMenu(
  mainMenus,
  menuContainer,
  shadowMenuItemsRef
)

onMounted(() => {
  getMainMenusAction()
})
</script>

<style scoped lang="scss">
.nav-menu-container {
  @apply flex flex-row items-center justify-center gap-8;
}

.nav-menu {
  @apply flex-1 min-w-0 mx-10;
}

.nav-item {
  @apply relative text-[var(--color-text)] no-underline text-lg flex-shrink-0;
}

.nav-item.active {
  @apply text-[var(--color-primary)];

  &::before {
    @apply content-[''] absolute bottom--3 left-1/2 translate-x--1/2 w-full h-1 rounded bg-[var(--color-primary)];
  }
}

.shadow-menu {
  @apply absolute invisible;
}

@media (max-width: 40rem) {
  .nav-menu {
    @apply hidden;
  }
}
</style>
