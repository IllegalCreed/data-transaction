<template>
  <div class="home-module-panel-root-container">
    <module-item
      v-for="(item, index) in modules"
      :key="item.title"
      :module="item"
      data-aos="fade-up"
      :data-aos-delay="aosDelay(index)"
    />
  </div>
</template>

<script setup lang="ts">
import ModuleItem from './ModuleItem.vue'
import { useHomeStore } from '@/stores/modules/home'

const homeStore = useHomeStore()
const { modules } = storeToRefs(homeStore)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  homeStore.getModules()
})
</script>

<style scoped lang="scss">
.home-module-panel-root-container {
  @apply grid grid-cols-2 gap-8 w-full max-w-320 px-10;

  @media (max-width: 40rem) {
    @apply grid-cols-1 gap-4 px-4;
  }
}
</style>
