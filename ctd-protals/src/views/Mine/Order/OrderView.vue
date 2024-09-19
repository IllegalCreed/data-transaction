<template>
  <div ref="root" flex flex-col h-full>
    <div class="tab" :class="{ visible: tabIsVisible }">
      <router-link
        v-for="(item, index) in personalMenuLinks.find((link) => link.path === '/mine/orders')
          ?.children || []"
        :key="index"
        :to="item.path"
        class="tab-item"
        :class="{ active: route.path === item.path }"
      >
        {{ item.label }}
      </router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/modules/menu'
const { personalMenuLinks } = useMenuStore()

const route = useRoute()

const root = useTemplateRef('root')
const rootIsVisible = useElementVisibility(root)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const tabIsVisible = computed(() => {
  return isMobileDevice.value && rootIsVisible.value
})
</script>

<style lang="scss" scoped>
.tab {
  @apply hidden flex-row items-center justify-around gap-4 h-15 min-w-80 fixed top-15 left-0 right-0 bg-white z-10 shadow-sm;

  &.visible {
    @apply flex;
  }

  .tab-item {
    @apply text-base no-underline text-gray-500 hover:opacity-60;

    &.active {
      @apply text-red-700;
    }
  }
}

.content {
  @media (max-width: 40rem) {
    @apply mt-15;
  }
}
</style>
