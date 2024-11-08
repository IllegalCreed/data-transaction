<template>
  <div flex flex-col h-full>
    <div class="tab">
      <router-link
        v-for="(item, index) in mineMenus?.find(
          link => link.path === '/mine/orders',
        )?.children || []"
        :key="index"
        :to="item.path"
        class="tab-item"
        :class="{ active: isActive(item.path) }"
      >
        {{ item.label }}
      </router-link>
    </div>
    <div class="content">
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

const isActive = (itemPath: string) => {
  if (route.meta.belong) {
    return itemPath === (route.meta.belong as string)
  }
  return itemPath === route.path
}

onMounted(() => {
  getMineMenusAction()
})
</script>

<style lang="scss" scoped>
.tab {
  @apply hidden flex-row items-center justify-around gap-4 h-15 min-w-80 sticky top-15 left-0 right-0 bg-[var(--color-background-alternating)] z-10 shadow-sm;

  .tab-item {
    @apply text-base no-underline text-[var(--color-text)] hover:opacity-60;

    &.active {
      @apply text-[var(--color-primary)];
    }
  }

  @media (max-width: 40rem) {
    @apply flex;
  }
}

.content {
  @media (max-width: 40rem) {
    @apply mt-5;
  }
}
</style>
