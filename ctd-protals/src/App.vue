<template>
  <el-watermark :font="font" :content="[settingsStore.watermarkContent]" :zIndex="100">
    <el-config-provider :locale="locale">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-config-provider>
  </el-watermark>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/modules/settings'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = zhCn

const settingsStore = useSettingsStore()
watch(
  () => settingsStore.watermarkEnabled,
  (value) => {
    font.color = value ? 'rgba(0, 0, 0, .1)' : 'rgba(0, 0, 0, 0)'
  }
)
const font = reactive({
  color: 'rgba(0, 0, 0, .1)'
})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-to,
.fade-leave-from {
  @apply opacity-100;
}
</style>
