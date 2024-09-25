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

const homeStore = useHomeStore()
const { modules } = storeToRefs(homeStore)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice ? 0 : index * 100
}

onMounted(() => {
  homeStore.getModules()
})
</script>

<style scoped lang="scss">
.home-module-panel-root-container {
  @apply grid grid-cols-2 gap-8 w-full max-w-300;

  @media (max-width: 75rem) {
    @apply grid-cols-1 gap-2 px-10;
  }
}
</style>
