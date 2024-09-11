<template>
  <el-watermark :font="font" :content="['Demo']" :zIndex="100">
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
const watermarkEnabled = computed(() => settingsStore.watermarkEnabled)

const font = reactive({
  color: 'rgba(0, 0, 0, .1)'
})

// 对于简单ref变量，直接使用watch即可，无需使用getter模式
watch(watermarkEnabled, (value) => {
  font.color = value ? 'rgba(0, 0, 0, .1)' : 'rgba(0, 0, 0, 0)'
})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
